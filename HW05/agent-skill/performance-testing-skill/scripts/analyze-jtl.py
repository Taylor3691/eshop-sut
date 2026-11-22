#!/usr/bin/env python3
"""Summarize CSV JMeter JTL data without replacing missing values with estimates.

Throughput is valid samples divided by the inclusive observed timestamp span
(max timestamp - min timestamp + 1 millisecond). For a single timestamp the
window is 1 ms. This is an observed-sample window, not a configured test duration.
"""
import argparse
import csv
import json
import math
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

REQUIRED = {"timeStamp", "elapsed", "label", "success"}


def percentile(values: list[int], p: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    # Nearest-rank definition: rank = ceil(p*n), with one-based ranks.
    return float(ordered[max(0, math.ceil(p * len(ordered)) - 1)])


def summarize(rows: list[dict]) -> dict:
    n = len(rows)
    errors = sum(not r["success"] for r in rows)
    start, end = min(r["timeStamp"] for r in rows), max(r["timeStamp"] for r in rows)
    window_ms = end - start + 1
    elapsed = [r["elapsed"] for r in rows]
    return {
        "samples": n,
        "errors": errors,
        "error_rate_percent": errors * 100.0 / n if n else None,
        "elapsed_ms": {"min": min(elapsed) if n else None,
                       "mean": sum(elapsed) / n if n else None,
                       "p90": percentile(elapsed, .90), "p95": percentile(elapsed, .95),
                       "p99": percentile(elapsed, .99), "max": max(elapsed) if n else None},
        "throughput_samples_per_second": n * 1000.0 / window_ms if n and window_ms > 0 else None,
        "window": {"start_epoch_ms": start, "end_epoch_ms": end,
                   "start_utc": datetime.fromtimestamp(start / 1000, timezone.utc).isoformat(),
                   "end_utc": datetime.fromtimestamp(end / 1000, timezone.utc).isoformat(),
                   "inclusive_span_ms": window_ms,
                   "definition": "sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span"},
    }


def read_jtl(path: Path) -> tuple[list[dict], list[str], list[str]]:
    rows, errors, warnings = [], [], []
    with path.open("r", encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        fields = set(reader.fieldnames or [])
        missing = REQUIRED - fields
        if missing:
            raise ValueError("Missing required columns: " + ", ".join(sorted(missing)))
        for line, raw in enumerate(reader, start=2):
            try:
                if None in raw:
                    raise ValueError("extra fields beyond header")
                missing_values = [name for name, value in raw.items() if value is None]
                if missing_values:
                    raise ValueError("missing values for columns: " + ", ".join(missing_values))
                timestamp = int(raw["timeStamp"])
                elapsed = int(raw["elapsed"])
                label = (raw["label"] or "").strip()
                success_text = (raw["success"] or "").strip().lower()
                if timestamp < 0 or elapsed < 0 or not label or success_text not in {"true", "false"}:
                    raise ValueError("empty/negative values or invalid success")
                rows.append({"timeStamp": timestamp, "elapsed": elapsed, "label": label,
                             "success": success_text == "true"})
            except (TypeError, ValueError, KeyError) as exc:
                errors.append(f"line {line}: {exc}")
    if errors:
        warnings.append(f"Excluded {len(errors)} malformed row(s); see malformed_rows")
    if not rows:
        warnings.append("Insufficient data: no valid samples; metrics are null")
    elif len(rows) < 20:
        warnings.append(f"Insufficient data for stable tail percentiles: only {len(rows)} valid sample(s)")
    return rows, errors, warnings


def markdown(summary: dict) -> str:
    def fmt(x):
        return "N/A" if x is None else f"{x:.2f}" if isinstance(x, float) else str(x)
    lines = ["# JMeter JTL Analysis", "", f"Valid samples: {summary['overall']['samples']}",
             f"Malformed rows excluded: {len(summary['malformed_rows'])}", "",
             "Throughput window: " + summary["overall"].get("window", {}).get("definition", "unavailable"), "",
             "## Overall", "", "| Metric | Value |", "|---|---:|",
             f"| Errors | {fmt(summary['overall']['errors'])} |",
             f"| Error rate (%) | {fmt(summary['overall']['error_rate_percent'])} |",
             f"| Mean elapsed (ms) | {fmt(summary['overall']['elapsed_ms']['mean'])} |",
             f"| p90 / p95 / p99 (ms) | {fmt(summary['overall']['elapsed_ms']['p90'])} / {fmt(summary['overall']['elapsed_ms']['p95'])} / {fmt(summary['overall']['elapsed_ms']['p99'])} |",
             f"| Throughput (samples/s) | {fmt(summary['overall']['throughput_samples_per_second'])} |", "",
             "## By label", "", "| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |", "|---|---:|---:|---:|---:|---:|"]
    for label, data in summary["by_label"].items():
        lines.append(f"| {label} | {data['samples']} | {data['errors']} | {fmt(data['error_rate_percent'])} | {fmt(data['elapsed_ms']['p95'])} | {fmt(data['throughput_samples_per_second'])} |")
    lines += ["", "## Warnings", ""]
    lines += [f"- {w}" for w in summary["warnings"]] or ["- None"]
    lines += ["", "Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.", ""]
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jtl", type=Path)
    parser.add_argument("--json-out", type=Path, default=Path("jtl-summary.json"))
    parser.add_argument("--md-out", type=Path, default=Path("jtl-summary.md"))
    args = parser.parse_args()
    if not args.jtl.is_file():
        print(f"ERROR: file not found: {args.jtl}", file=sys.stderr)
        return 2
    try:
        rows, malformed, warnings = read_jtl(args.jtl)
        by_label = defaultdict(list)
        for row in rows:
            by_label[row["label"]].append(row)
        result = {"source_file": str(args.jtl), "required_columns": sorted(REQUIRED),
                  "percentile_method": "nearest rank, ceil(p*n), one-based",
                  "overall": summarize(rows) if rows else {"samples": 0, "errors": None,
                      "error_rate_percent": None, "elapsed_ms": {k: None for k in ("min", "mean", "p90", "p95", "p99", "max")},
                      "throughput_samples_per_second": None, "window": {}},
                  "by_label": {label: summarize(group) for label, group in sorted(by_label.items())},
                  "warnings": warnings, "malformed_rows": malformed}
        args.json_out.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        args.md_out.write_text(markdown(result), encoding="utf-8")
        print(f"Wrote {args.json_out} and {args.md_out}; valid samples={len(rows)}, malformed rows={len(malformed)}")
        return 0
    except (OSError, UnicodeError, csv.Error, ValueError, OverflowError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
