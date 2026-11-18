#!/usr/bin/env python3
"""Validate the structure and basic data quality of a CSV JMeter JTL file."""
import argparse
import csv
import sys
from pathlib import Path

REQUIRED = {"timeStamp", "elapsed", "label", "success"}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jtl", type=Path)
    args = parser.parse_args()
    if not args.jtl.is_file():
        print(f"ERROR: file not found: {args.jtl}", file=sys.stderr)
        return 2
    errors, warnings, count = [], [], 0
    try:
        with args.jtl.open("r", encoding="utf-8-sig", newline="") as stream:
            reader = csv.DictReader(stream)
            fields = set(reader.fieldnames or [])
            missing = REQUIRED - fields
            if missing:
                errors.append("Missing required columns: " + ", ".join(sorted(missing)))
            for line, row in enumerate(reader, start=2):
                count += 1
                if None in row:
                    errors.append(f"Line {line}: extra fields beyond header")
                    continue
                for key in REQUIRED & fields:
                    value = (row.get(key) or "").strip()
                    if not value:
                        errors.append(f"Line {line}: empty {key}")
                try:
                    if row.get("timeStamp", "").strip():
                        int(row["timeStamp"])
                    if row.get("elapsed", "").strip() and int(row["elapsed"]) < 0:
                        errors.append(f"Line {line}: elapsed must be non-negative")
                    if row.get("success", "").strip().lower() not in {"true", "false"}:
                        errors.append(f"Line {line}: success must be true or false")
                except ValueError:
                    errors.append(f"Line {line}: malformed numeric timestamp or elapsed")
    except (OSError, UnicodeError, csv.Error) as exc:
        print(f"ERROR: cannot read CSV JTL: {exc}", file=sys.stderr)
        return 2
    if count == 0:
        warnings.append("No sample rows found")
    print(f"File: {args.jtl}\nSample rows: {count}")
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}")
    if errors:
        print(f"Validation failed ({len(errors)} issue(s))")
        return 1
    print("Validation passed for required columns and basic values")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
