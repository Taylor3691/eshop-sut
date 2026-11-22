#!/usr/bin/env python3
"""Phân tích file JMeter .jtl (CSV) bằng số tính trực tiếp từ dữ liệu thô.

Không dùng statistics.json của report HTML: với lần chạy lớn, percentile trong đó
có thể lệch rất xa (HW05 Soak: Total p99 3 ms trong report, 86 ms tính từ .jtl).

Đọc theo luồng, chạy được với file vài trăm MB và file .jtl.gz.

Ví dụ:
  python3 jtl_analyze.py results/load.jtl
  python3 jtl_analyze.py results/soak.jtl.gz --window 60 --rss results/soak_node_rss.csv
  python3 jtl_analyze.py results/stress.jtl.gz --window 30 --compare reports/stress/statistics.json
  python3 jtl_analyze.py results/load.jtl --exclude LOCK_ --exclude setUp_ --markdown > summary.md
"""

from __future__ import annotations

import argparse
import csv
import gzip
import json
import math
import sys
from collections import defaultdict
from pathlib import Path


def open_text(path: Path):
    if path.suffix == ".gz":
        return gzip.open(path, "rt", newline="", encoding="utf-8")
    return path.open("r", newline="", encoding="utf-8")


class Hist:
    """Histogram theo millisecond nguyên: tính percentile chính xác mà không giữ từng sample."""

    __slots__ = ("counts", "n", "errors", "total_ms", "max_ms", "threads")

    def __init__(self) -> None:
        self.counts: dict[int, int] = defaultdict(int)
        self.n = 0
        self.errors = 0
        self.total_ms = 0
        self.max_ms = 0
        self.threads = 0

    def add(self, ms: int, failed: bool, threads: int) -> None:
        self.counts[ms] += 1
        self.n += 1
        self.total_ms += ms
        self.errors += failed
        if ms > self.max_ms:
            self.max_ms = ms
        if threads > self.threads:
            self.threads = threads

    def merge(self, other: "Hist") -> None:
        for ms, c in other.counts.items():
            self.counts[ms] += c
        self.n += other.n
        self.errors += other.errors
        self.total_ms += other.total_ms
        self.max_ms = max(self.max_ms, other.max_ms)
        self.threads = max(self.threads, other.threads)

    def pct(self, p: float) -> int | None:
        """Nearest-rank: phần tử thứ ceil(p/100 * n)."""
        if self.n == 0:
            return None
        rank = max(1, math.ceil(p / 100.0 * self.n))
        seen = 0
        for ms in sorted(self.counts):
            seen += self.counts[ms]
            if seen >= rank:
                return ms
        return self.max_ms

    def mean(self) -> float:
        return self.total_ms / self.n if self.n else 0.0


def analyze(path: Path, excludes: list[str], window_s: int | None):
    labels: dict[str, Hist] = defaultdict(Hist)
    windows: dict[int, Hist] = defaultdict(Hist)
    excluded: dict[str, Hist] = defaultdict(Hist)
    t_min = t_max = None
    t0 = None  # mốc cửa sổ: sample đầu tiên không bị loại trừ
    with open_text(path) as f:
        reader = csv.DictReader(f)
        need = {"timeStamp", "elapsed", "label", "success"}
        missing = need - set(reader.fieldnames or [])
        if missing:
            sys.exit(f"{path}: thiếu cột {sorted(missing)}. Cần lưu .jtl dạng CSV có header.")
        has_threads = "allThreads" in (reader.fieldnames or [])
        for row in reader:
            label = row["label"]
            try:
                ts = int(row["timeStamp"])
                ms = int(float(row["elapsed"]) + 0.5)
            except ValueError:
                continue
            failed = row["success"].strip().lower() != "true"
            threads = int(row["allThreads"] or 0) if has_threads else 0
            if any(label.startswith(p) for p in excludes):
                excluded[label].add(ms, failed, threads)
                continue
            if t_min is None or ts < t_min:
                t_min = ts
            if t_max is None or ts > t_max:
                t_max = ts
            labels[label].add(ms, failed, threads)
            if window_s:
                if t0 is None:
                    t0 = ts
                windows[(ts - t0) // (window_s * 1000)].add(ms, failed, threads)
    return labels, windows, excluded, t_min, t_max, t0


def fmt(v) -> str:
    if v is None:
        return "—"
    if isinstance(v, float):
        return f"{v:.2f}"
    return str(v)


def table(headers: list[str], rows: list[list], markdown: bool) -> str:
    rows = [[fmt(c) for c in r] for r in rows]
    if markdown:
        out = ["| " + " | ".join(headers) + " |", "|" + "---|" * len(headers)]
        out += ["| " + " | ".join(r) + " |" for r in rows]
        return "\n".join(out)
    widths = [max(len(h), *(len(r[i]) for r in rows)) if rows else len(h) for i, h in enumerate(headers)]
    line = lambda cells: "  ".join(c.rjust(w) if i else c.ljust(w) for i, (c, w) in enumerate(zip(cells, widths)))
    return "\n".join([line(headers), line(["-" * w for w in widths])] + [line(r) for r in rows])


def load_rss(path: Path) -> list[tuple[int, float]]:
    out = []
    with path.open() as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) >= 2:
                out.append((int(row[0]), int(row[1]) / 1024.0))
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("jtl", type=Path)
    ap.add_argument("--exclude", action="append", default=None,
                    help="tiền tố label bỏ khỏi thống kê hiệu năng (mặc định LOCK_). Lặp lại được.")
    ap.add_argument("--window", type=int, default=None, help="độ dài cửa sổ thời gian (giây)")
    ap.add_argument("--rss", type=Path, default=None, help="CSV epoch_ms,rss_kb để ghép RAM theo cửa sổ")
    ap.add_argument("--compare", type=Path, default=None, help="statistics.json của report HTML để đối chiếu")
    ap.add_argument("--markdown", action="store_true", help="in bảng Markdown")
    args = ap.parse_args()
    excludes = args.exclude if args.exclude is not None else ["LOCK_"]

    labels, windows, excluded, t_min, t_max, t0 = analyze(args.jtl, excludes, args.window)
    if not labels:
        print("Không có sample nào sau khi loại trừ.", file=sys.stderr)
        return 1
    duration = (t_max - t_min) / 1000.0 if t_max and t_min else 0.0
    total = Hist()
    for h in labels.values():
        total.merge(h)

    print(f"# {args.jtl}")
    print(f"Thời lượng (từ sample đầu đến sample cuối): {duration:.1f} s · Loại trừ tiền tố: {excludes}\n")

    rows = []
    for name in sorted(labels) + ["TOTAL"]:
        h = total if name == "TOTAL" else labels[name]
        tput = h.n / duration if duration else 0.0
        rows.append([name, h.n, h.errors, f"{100.0 * h.errors / h.n:.2f}%", h.mean(),
                     h.pct(50), h.pct(90), h.pct(95), h.pct(99), h.pct(99.9), h.max_ms, f"{tput:.1f}"])
    print("## Theo label (percentile nearest-rank từ cột elapsed)\n")
    print(table(["label", "n", "lỗi", "lỗi %", "mean", "p50", "p90", "p95", "p99", "p99.9", "max", "req/s TB"],
                rows, args.markdown))
    print("\nreq/s TB là trung bình cả bài, gồm cả lúc tăng/giảm thread: KHÔNG phải năng lực tối đa.")

    if excluded:
        print("\n## Label bị loại trừ (kiểm tra chức năng, không tính hiệu năng)\n")
        print(table(["label", "n", "lỗi"], [[k, v.n, v.errors] for k, v in sorted(excluded.items())], args.markdown))

    if args.window:
        rss = load_rss(args.rss) if args.rss else []
        w0 = min(windows)
        last = max(windows)
        rows = []
        for idx in range(w0, last + 1):
            h = windows.get(idx)
            if not h:
                continue
            start_ms = t0 + idx * args.window * 1000
            span = float(args.window)
            if idx == last and t_max is not None:
                span = max((t_max - start_ms) / 1000.0, 0.001)
            row = [f"{idx * args.window}", h.threads, f"{h.n / span:.1f}", h.mean(),
                   h.pct(95), h.pct(99), h.max_ms, h.errors]
            if rss:
                vals = [mb for ts, mb in rss if start_ms <= ts < start_ms + args.window * 1000]
                row.append(f"{min(vals):.0f}–{max(vals):.0f}" if vals else "—")
            note = "cửa sổ cuối không trọn" if span < args.window - 1 else ""
            rows.append(row + [note])
        headers = ["t (s)", "threads", "req/s", "mean", "p95", "p99", "max", "lỗi"]
        if rss:
            headers.append("RSS MB")
        print(f"\n## Theo cửa sổ {args.window} s\n")
        print(table(headers + ["ghi chú"], rows, args.markdown))
        peak = max(rows, key=lambda r: float(r[2]) if not r[-1] else -1.0)
        print(f"\nĐỉnh throughput (bỏ cửa sổ không trọn): {peak[2]} req/s ở t = {peak[0]} s, {peak[1]} thread.")
        if rss:
            print(f"RSS: đầu {rss[0][1]:.0f} MB, cao nhất {max(v for _, v in rss):.0f} MB, cuối {rss[-1][1]:.0f} MB.")

    if args.compare:
        stats = json.loads(args.compare.read_text(encoding="utf-8"))
        rows = []
        for name in sorted(labels) + ["Total"]:
            s = stats.get(name)
            h = total if name == "Total" else labels.get(name)
            if not s or not h:
                continue
            for key, p in (("pct2ResTime", 95), ("pct3ResTime", 99)):
                mine = h.pct(p)
                theirs = s.get(key)
                diff = None if theirs is None or mine is None else round(float(theirs) - mine, 2)
                flag = "LỆCH" if diff and abs(diff) >= 1 else ""
                rows.append([name, f"p{p}", theirs, mine, diff, flag])
        print(f"\n## Đối chiếu với {args.compare}\n")
        print("Lưu ý: Total trong statistics.json có thể gồm cả label bị loại trừ ở trên.\n")
        print(table(["label", "chỉ số", "statistics.json", ".jtl", "chênh", ""], rows, args.markdown))
    return 0


if __name__ == "__main__":
    sys.exit(main())
