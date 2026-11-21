#!/usr/bin/env python3
"""So sánh p95/p99 từng label trong file .jtl với một baseline JSON.

Phân vị là nearest-rank trên cột elapsed, làm tròn millisecond. Label bắt đầu
bằng LOCK_ bị bỏ. Script không đọc statistics.json.

Ngưỡng p95, cùng plan và cùng máy với baseline:
  lệch <= 1 ms              đạt                         exit 0
  lệch >= 2 ms, lần đầu     cần chạy lại để xác nhận   exit 2
  lệch >= 3 ms sau --confirm regression                exit 1
  lệch đúng 2 ms sau --confirm chỉ cảnh báo, không chặn exit 0

Lệch 1 ms nằm trong bước nhảy đã thấy trên cùng profile (p95 2 ms và 3 ms).
Ngưỡng tương đối 10–20% nhỏ hơn 1 ms nên không dùng.

Exit code:
  0  pass
  1  regression. Trên PR đây là lần xác nhận còn lệch, job chặn merge.
     Trên nightly/weekly đây cũng là regression: job lịch báo đỏ, nhưng
     job đó không phải required check nên không chặn merge.
  2  cần chạy lại đúng plan một lần để xác nhận
  3  lỗi đầu vào (không thấy file, sai cột, sai tầng). Chạy lại plan không sửa được.
"""

from __future__ import annotations

import argparse
import csv
import gzip
import json
import math
import sys
from pathlib import Path

LOCK_PREFIX = "LOCK_"
PASS_DELTA_MS = 1
REGRESSION_DELTA_MS = 3

# Soak 150 thread, think-time 0–50 ms: phút 1–7 p99 = 3 ms, p95 = 2 ms,
# khoảng 6.801–6.839 req/s. Phút 8: p95 4, p99 125, 5.885 req/s.
NIGHTLY_MIN_DURATION_S = 8 * 60
NIGHTLY_RAMP_S = 60
NIGHTLY_FROM_MINUTE = 8
NIGHTLY_P99_MS = 20
NIGHTLY_P95_MS = 9
NIGHTLY_MIN_RPS = 6120

# Stress ở 200 thread: đỉnh 8.862–8.930 req/s, p95 3 ms.
WEEKLY_MIN_THREADS = 200
WEEKLY_MIN_PEAK_RPS = 8000
WINDOW_MS = 30_000

EXIT_PASS = 0
EXIT_REGRESSION = 1
EXIT_RERUN = 2
EXIT_INPUT = 3


class JtlError(Exception):
    pass


def open_text(path: Path):
    if path.suffix == ".gz":
        return gzip.open(path, "rt", newline="", encoding="utf-8")
    return path.open("r", newline="", encoding="utf-8")


def elapsed_ms(raw: str) -> int:
    value = float(raw)
    if value < 0:
        raise ValueError(raw)
    return int(value + 0.5)


def percentile(counts: dict[int, int], total: int, percent: float) -> int | None:
    """Nearest-rank: thứ hạng ceil(p/100 * n), 1-indexed, trên elapsed đã làm tròn."""
    if total <= 0:
        return None
    rank = math.ceil(percent / 100.0 * total)
    rank = max(rank, 1)
    seen = 0
    for ms in sorted(counts):
        seen += counts[ms]
        if seen >= rank:
            return ms
    return None


def median(values: list[float]) -> float:
    ordered = sorted(values)
    count = len(ordered)
    if count == 0:
        raise ValueError("empty")
    mid = count // 2
    if count % 2 == 1:
        return float(ordered[mid])
    return (float(ordered[mid - 1]) + float(ordered[mid])) / 2.0


def as_json_number(value: float) -> int | float:
    if float(value).is_integer():
        return int(value)
    return float(value)


def empty_hist() -> dict:
    return {"counts": {}, "n": 0, "errors": 0}


def add_sample(hist: dict, ms: int, failed: bool) -> None:
    key = str(ms)
    hist["counts"][key] = hist["counts"].get(key, 0) + 1
    hist["n"] += 1
    if failed:
        hist["errors"] += 1


def counts_of(hist: dict) -> dict[int, int]:
    return {int(ms): count for ms, count in hist["counts"].items()}


def validate_header(path: Path, fieldnames: list[str] | None, track_minutes: bool, track_windows: bool) -> None:
    if not fieldnames or "elapsed" not in fieldnames or "label" not in fieldnames:
        raise JtlError(f"{path}: cần cột label và elapsed")
    if "success" not in fieldnames:
        raise JtlError(f"{path}: cần cột success")
    if (track_minutes or track_windows) and "timeStamp" not in fieldnames:
        raise JtlError(f"{path}: cần cột timeStamp cho tier này")
    if track_windows and "allThreads" not in fieldnames:
        raise JtlError(f"{path}: cần cột allThreads để xét đỉnh 200 thread")


def read_jtl(path: Path, track_minutes: bool, track_windows: bool) -> dict:
    labels: dict[str, dict] = {}
    rows = 0
    skipped = 0
    min_ts = None
    max_ts = None

    with open_text(path) as handle:
        reader = csv.DictReader(handle)
        validate_header(path, reader.fieldnames, track_minutes, track_windows)
        has_ts = bool(reader.fieldnames) and "timeStamp" in reader.fieldnames
        for row in reader:
            parsed = parse_row(row)
            if parsed is None:
                rows += 1
                continue
            if parsed == "skip":
                rows += 1
                skipped += 1
                continue
            rows += 1
            label, ms, failed, ts = parsed
            hist = labels.get(label)
            if hist is None:
                hist = empty_hist()
                labels[label] = hist
            add_sample(hist, ms, failed)
            if ts is None or not has_ts:
                continue
            if min_ts is None or ts < min_ts:
                min_ts = ts
            if max_ts is None or ts > max_ts:
                max_ts = ts

    minutes: dict[int, dict] = {}
    windows: dict[int, dict] = {}
    if min_ts is not None and (track_minutes or track_windows):
        minutes, windows = bucket_time(path, min_ts, track_minutes, track_windows)

    duration_s = 0.0
    if min_ts is not None and max_ts is not None and max_ts > min_ts:
        duration_s = (max_ts - min_ts) / 1000.0

    return {
        "path": str(path),
        "labels": labels,
        "minutes": minutes,
        "windows": windows,
        "rows": rows,
        "skipped": skipped,
        "duration_s": duration_s,
        "min_ts": min_ts,
        "max_ts": max_ts,
    }


def parse_row(row: dict):
    """None = LOCK_* or empty label. 'skip' = elapsed hỏng. Else (label, ms, failed, ts|None)."""
    label = (row.get("label") or "").strip()
    if not label or label.startswith(LOCK_PREFIX):
        return None
    try:
        ms = elapsed_ms(row["elapsed"])
    except (TypeError, ValueError):
        return "skip"
    failed = (row.get("success") or "").strip().lower() != "true"
    ts = None
    if row.get("timeStamp") not in (None, ""):
        try:
            ts = int(row["timeStamp"])
        except ValueError:
            ts = None
    return label, ms, failed, ts


def bucket_time(path: Path, t0: int, track_minutes: bool, track_windows: bool) -> tuple[dict, dict]:
    """Cửa sổ tính từ sample đầu, không cắt theo phút đồng hồ."""
    minutes: dict[int, dict] = {}
    windows: dict[int, dict] = {}
    with open_text(path) as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            parsed = parse_row(row)
            if not parsed or parsed == "skip":
                continue
            _label, ms, failed, ts = parsed
            if ts is None:
                continue
            if track_minutes:
                index = (ts - t0) // 60_000
                hist = minutes.get(index)
                if hist is None:
                    hist = empty_hist()
                    hist["max_ts"] = ts
                    minutes[index] = hist
                add_sample(hist, ms, failed)
                if ts > hist["max_ts"]:
                    hist["max_ts"] = ts
            if track_windows:
                index = (ts - t0) // WINDOW_MS
                window = windows.get(index)
                if window is None:
                    window = {"n": 0, "max_threads": 0, "max_ts": ts}
                    windows[index] = window
                window["n"] += 1
                if ts > window["max_ts"]:
                    window["max_ts"] = ts
                try:
                    threads = int(row.get("allThreads") or 0)
                except ValueError:
                    threads = 0
                if threads > window["max_threads"]:
                    window["max_threads"] = threads
    return minutes, windows


def label_stats(hist: dict) -> dict:
    counts = counts_of(hist)
    total = hist["n"]
    return {
        "p95_ms": percentile(counts, total, 95),
        "p99_ms": percentile(counts, total, 99),
        "sample_count": total,
        "error_count": hist["errors"],
    }


def summarize_labels(parsed: dict) -> dict[str, dict]:
    return {label: label_stats(hist) for label, hist in sorted(parsed["labels"].items())}


def build_baseline(paths: list[Path], tier: str, machine: str | None) -> dict:
    runs = []
    label_names = None
    for path in paths:
        if not path.is_file():
            raise JtlError(f"Không thấy file: {path}")
        parsed = read_jtl(path, track_minutes=False, track_windows=False)
        stats = summarize_labels(parsed)
        if not stats:
            raise JtlError(f"{path}: không có sample ngoài LOCK_*")
        names = set(stats)
        if label_names is None:
            label_names = names
        elif names != label_names:
            missing = sorted(label_names - names)
            extra = sorted(names - label_names)
            raise JtlError(
                f"{path}: tập label khác các file kia. Thiếu {missing or '—'}, thêm {extra or '—'}."
            )
        bad = [name for name, item in stats.items() if item["error_count"]]
        if bad:
            raise JtlError(
                f"{path}: còn lỗi nghiệp vụ ở {', '.join(bad)}. Không ghi baseline từ lần chạy này."
            )
        runs.append({"file": str(path), "labels": stats})

    labels = {}
    for name in sorted(label_names or []):
        p95_values = [run["labels"][name]["p95_ms"] for run in runs]
        p99_values = [run["labels"][name]["p99_ms"] for run in runs]
        labels[name] = {
            "p95_ms": as_json_number(median(p95_values)),
            "p99_ms": as_json_number(median(p99_values)),
            "p95_runs": p95_values,
            "p99_runs": p99_values,
            "sample_count_runs": [run["labels"][name]["sample_count"] for run in runs],
        }
    payload = {
        "version": 1,
        "percentile": "nearest-rank",
        "elapsed_column": "elapsed",
        "elapsed_unit": "ms",
        "excluded_prefix": LOCK_PREFIX,
        "tier": tier,
        "runs": len(runs),
        "files": [str(path) for path in paths],
        "labels": labels,
    }
    if machine:
        payload["machine"] = machine
    return payload


def delta(measured, baseline) -> float | None:
    if measured is None or baseline is None:
        return None
    return float(measured) - float(baseline)


def judge_p95(change: float | None, confirm: bool) -> tuple[str, int]:
    if change is None:
        return "thiếu số", EXIT_RERUN
    if change <= PASS_DELTA_MS + 1e-9:
        return "đạt", EXIT_PASS
    if change + 1e-9 >= REGRESSION_DELTA_MS:
        if confirm:
            return "regression", EXIT_REGRESSION
        return "cần chạy lại", EXIT_RERUN
    if confirm:
        return "cảnh báo", EXIT_PASS
    return "cần chạy lại", EXIT_RERUN


def window_rps(count: int, index: int, last_index: int, t0: int, width_ms: int, max_ts: int) -> float:
    start = t0 + index * width_ms
    if index < last_index:
        duration = width_ms / 1000.0
    else:
        duration = max((max_ts - start) / 1000.0, 0.001)
    return count / duration


def minute_covered_ms(index: int, t0: int, test_end: int) -> int:
    start = t0 + index * 60_000
    if test_end <= start:
        return 0
    return min(test_end, start + 60_000) - start


def nightly_findings(parsed: dict) -> list[tuple[int, str]]:
    """Ngưỡng phút 8 đứng xa độ nhiễu 1 ms nên là regression, không cần --confirm.

    p95 của cả file Soak vẫn là 2 ms sau khi phút 8 đã hỏng, nên phải xét từng phút.
    Phút 0 là ramp-up 60 giây. Phút cuối không đủ 60 giây là lúc thread đang dừng.
    Cả hai có ở mọi lần chạy và không được đưa vào ngưỡng.
    """
    if parsed["duration_s"] + 1e-9 < NIGHTLY_MIN_DURATION_S:
        return [(
            EXIT_RERUN,
            f"Soak dài {parsed['duration_s']:.0f} s, chưa đủ {NIGHTLY_MIN_DURATION_S} s nên không kết luận phút 8.",
        )]
    minutes = parsed["minutes"]
    t0 = parsed["min_ts"]
    test_end = parsed["max_ts"]
    if not minutes or t0 is None or test_end is None:
        return [(EXIT_RERUN, "Không có timeStamp để chia phút.")]
    last_index = max(minutes)
    findings = []
    print("\nPhút Soak (bỏ LOCK_*)")
    print(f"{'phút':>6} {'giây':>8} {'req/s':>10} {'p95':>6} {'p99':>6} {'n':>10}  ghi chú")
    for index in range(0, last_index + 1):
        hist = minutes.get(index)
        if not hist:
            continue
        stats = label_stats(hist)
        covered = minute_covered_ms(index, t0, test_end)
        rps = hist["n"] / (covered / 1000.0) if covered else 0.0
        note = ""
        if covered < 60_000:
            note = "bỏ qua, không đủ 60 giây"
        elif index * 60 < NIGHTLY_RAMP_S:
            note = "bỏ qua, ramp-up"
        print(
            f"{index:6d} {covered / 1000.0:8.3f} {rps:10.1f} "
            f"{stats['p95_ms']:6} {stats['p99_ms']:6} {stats['sample_count']:10d}  {note}"
        )
        if note or index < NIGHTLY_FROM_MINUTE:
            continue
        if stats["p99_ms"] is not None and stats["p99_ms"] >= NIGHTLY_P99_MS:
            findings.append((EXIT_REGRESSION, f"phút {index}: p99 {stats['p99_ms']} ms >= {NIGHTLY_P99_MS} ms"))
        if rps < NIGHTLY_MIN_RPS:
            findings.append((EXIT_REGRESSION, f"phút {index}: {rps:.0f} req/s < {NIGHTLY_MIN_RPS}"))
        if stats["p95_ms"] is not None and stats["p95_ms"] >= NIGHTLY_P95_MS:
            findings.append((EXIT_REGRESSION, f"phút {index}: p95 {stats['p95_ms']} ms >= {NIGHTLY_P95_MS} ms"))
    return findings


def weekly_finding(parsed: dict) -> tuple[int, str] | None:
    windows = parsed["windows"]
    t0 = parsed["min_ts"]
    if not windows or t0 is None:
        return EXIT_RERUN, "Không có cửa sổ 30 giây."
    last_index = max(windows)
    peak = None
    saw_ceiling = False
    for index, window in windows.items():
        if window["max_threads"] < WEEKLY_MIN_THREADS:
            continue
        saw_ceiling = True
        rps = window_rps(window["n"], index, last_index, t0, WINDOW_MS, window["max_ts"])
        if peak is None or rps > peak:
            peak = rps
    if not saw_ceiling:
        print(f"\nWeekly: không có cửa sổ nào đạt {WEEKLY_MIN_THREADS} thread. Bỏ qua ngưỡng đỉnh.")
        return None
    print(f"\nWeekly: đỉnh ở >= {WEEKLY_MIN_THREADS} thread là {peak:.0f} req/s (ngưỡng {WEEKLY_MIN_PEAK_RPS}).")
    if peak is not None and peak < WEEKLY_MIN_PEAK_RPS:
        return EXIT_REGRESSION, f"đỉnh {peak:.0f} req/s < {WEEKLY_MIN_PEAK_RPS}"
    return None


def print_table(rows: list[dict]) -> None:
    headers = ["label", "n", "lỗi", "p95", "base p95", "lệch", "p99", "base p99", "lệch p99", "kết luận"]
    table = []
    for row in rows:
        table.append([
            row["label"],
            str(row["n"]),
            str(row["errors"]),
            fmt(row["p95"]),
            fmt(row["base_p95"]),
            fmt(row["d95"]),
            fmt(row["p99"]),
            fmt(row["base_p99"]),
            fmt(row["d99"]),
            row["verdict"],
        ])
    widths = [len(header) for header in headers]
    for cells in table:
        for index, cell in enumerate(cells):
            widths[index] = max(widths[index], len(cell))
    line = "  ".join(header.ljust(widths[index]) for index, header in enumerate(headers))
    print(line)
    print("  ".join("-" * width for width in widths))
    for cells in table:
        print("  ".join(cell.ljust(widths[index]) for index, cell in enumerate(cells)))


def fmt(value) -> str:
    if value is None:
        return "—"
    number = float(value)
    if number.is_integer():
        return str(int(number))
    return f"{number:.1f}"


def check(baseline_path: Path, jtl_path: Path, confirm: bool, tier: str, machine: str | None) -> int:
    if not baseline_path.is_file():
        raise JtlError(f"Không thấy baseline: {baseline_path}")
    if not jtl_path.is_file():
        raise JtlError(f"Không thấy jtl: {jtl_path}")
    baseline = json.loads(baseline_path.read_text(encoding="utf-8"))
    if baseline.get("version") != 1:
        raise JtlError("Baseline không phải version 1")
    base_tier = baseline.get("tier")
    if base_tier and base_tier != tier:
        raise JtlError(f"Baseline thuộc tầng {base_tier}, lần chạy này là tầng {tier}.")
    base_machine = baseline.get("machine")
    if machine and base_machine and machine != base_machine:
        raise JtlError(
            f"Baseline đo trên {base_machine}, lần này là {machine}. Không so số millisecond giữa hai loại máy."
        )

    parsed = read_jtl(
        jtl_path,
        track_minutes=(tier == "nightly"),
        track_windows=(tier == "weekly"),
    )
    measured = summarize_labels(parsed)
    base_labels = baseline.get("labels") or {}
    names = sorted(set(measured) | set(base_labels))
    rows = []
    exit_code = EXIT_PASS
    for name in names:
        item = measured.get(name)
        base = base_labels.get(name)
        if item is None or base is None:
            verdict, code = "thiếu baseline" if item else "thiếu trong jtl", EXIT_RERUN
            rows.append({
                "label": name,
                "n": 0 if item is None else item["sample_count"],
                "errors": 0 if item is None else item["error_count"],
                "p95": None if item is None else item["p95_ms"],
                "base_p95": None if base is None else base.get("p95_ms"),
                "d95": None,
                "p99": None if item is None else item["p99_ms"],
                "base_p99": None if base is None else base.get("p99_ms"),
                "d99": None,
                "verdict": verdict,
            })
            exit_code = max(exit_code, code)
            continue
        d95 = delta(item["p95_ms"], base.get("p95_ms"))
        d99 = delta(item["p99_ms"], base.get("p99_ms"))
        if item["error_count"]:
            verdict = "không hợp lệ"
            code = EXIT_REGRESSION if confirm else EXIT_RERUN
        else:
            verdict, code = judge_p95(d95, confirm)
        rows.append({
            "label": name,
            "n": item["sample_count"],
            "errors": item["error_count"],
            "p95": item["p95_ms"],
            "base_p95": base.get("p95_ms"),
            "d95": d95,
            "p99": item["p99_ms"],
            "base_p99": base.get("p99_ms"),
            "d99": d99,
            "verdict": verdict,
        })
        exit_code = max(exit_code, code)

    print_table(rows)
    if parsed["skipped"]:
        print(f"\nBỏ {parsed['skipped']} dòng không có elapsed.")

    if tier == "nightly":
        for code, finding in nightly_findings(parsed):
            print(f"Nightly: {finding}")
            exit_code = max(exit_code, code)
    elif tier == "weekly":
        finding = weekly_finding(parsed)
        if finding:
            code, text = finding
            print(f"Weekly: {text}")
            exit_code = max(exit_code, code)

    if exit_code == EXIT_PASS:
        warned = any(row["verdict"] == "cảnh báo" for row in rows)
        if warned:
            print("\nKết luận: cảnh báo, không chặn. Không ghi lần này vào baseline.")
        else:
            print("\nKết luận: pass. Baseline chỉ được ghi khi lần chạy này là trên main và cùng máy.")
    elif exit_code == EXIT_RERUN:
        print("\nKết luận: cần chạy lại một lần trên process Node mới. Không ghi baseline.")
    elif tier in ("nightly", "weekly"):
        print("\nKết luận: regression (exit 1). Job lịch báo đỏ và không chặn merge. Không ghi baseline.")
    else:
        print("\nKết luận: regression. Không ghi baseline.")
    return exit_code


def command_baseline(args: argparse.Namespace) -> int:
    payload = build_baseline([Path(path) for path in args.jtl], args.tier, args.machine)
    text = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    if args.output == "-":
        sys.stdout.write(text)
    else:
        output = Path(args.output)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(text, encoding="utf-8")
        print(f"Đã ghi {output} từ {payload['runs']} file, {len(payload['labels'])} label.")
    return EXIT_PASS


def command_check(args: argparse.Namespace) -> int:
    return check(Path(args.baseline), Path(args.jtl), args.confirm, args.tier, args.machine)


def parser() -> argparse.ArgumentParser:
    program = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = program.add_subparsers(dest="command", required=True)

    baseline = sub.add_parser("baseline", help="tạo baseline JSON từ một hoặc nhiều file .jtl/.jtl.gz")
    baseline.add_argument("jtl", nargs="+", help="file .jtl hoặc .jtl.gz")
    baseline.add_argument("-o", "--output", required=True, help="đường dẫn JSON, hoặc - để in ra stdout")
    baseline.add_argument("--tier", choices=["pr", "merge", "nightly", "weekly"], default="pr")
    baseline.add_argument("--machine", default=None, help="tên loại máy, ví dụ macbook-air-m5")
    baseline.set_defaults(func=command_baseline)

    check_cmd = sub.add_parser("check", help="so một file .jtl với baseline")
    check_cmd.add_argument("--baseline", required=True)
    check_cmd.add_argument("--jtl", required=True)
    check_cmd.add_argument("--confirm", action="store_true", help="đây là lần chạy lại để xác nhận")
    check_cmd.add_argument("--tier", choices=["pr", "merge", "nightly", "weekly"], default="pr")
    check_cmd.add_argument("--machine", default=None)
    check_cmd.set_defaults(func=command_check)
    return program


def main(argv: list[str] | None = None) -> int:
    args = parser().parse_args(argv)
    try:
        return args.func(args)
    except JtlError as exc:
        print(f"Lỗi: {exc}", file=sys.stderr)
        return EXIT_INPUT


if __name__ == "__main__":
    sys.exit(main())
