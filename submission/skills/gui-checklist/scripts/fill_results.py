#!/usr/bin/env python3
"""Điền kết quả đã kiểm chứng từ execution-observations.md vào sheet Checklist của checklist.xlsx,
và chép ảnh của các mục Failed sang thư mục failed/.

Cột "Kết quả đã kiểm chứng" (cột cuối của bảng) do NGƯỜI KIỂM THỬ điền theo dạng:
    Passed | Passed — ghi chú | Failed — lý do | N/A — lý do      (được phép in đậm **Failed**)
Script không tự suy ra kết quả: ô trống thì bỏ qua và báo lại.

Dùng:
    python3 fill_results.py --obs execution-observations.md --xlsx checklist.xlsx \
        --run-dir screenshots/run --failed-dir screenshots/failed [--dry-run]
"""
import argparse, re, shutil, sys
from pathlib import Path

import openpyxl

COLS = {"id": "ID", "result": "Kết quả", "notes": "Notes", "shot": "Screenshot"}


def parse_obs(path):
    rows = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\| [A-Z]+-[\w-]+ \|", line):
            continue
        cells = [c.strip() for c in re.split(r"(?<!\\)\|", line)[1:-1]]
        rid, verified = cells[0], cells[-1]
        imgs = re.findall(r"\[([^\]]+\.png)\]", line)
        rows[rid] = (verified, imgs)
    return rows


def parse_verified(cell):
    s = re.sub(r"\*\*", "", cell).strip()
    m = re.match(r"^(Passed|Failed|N/A)\s*(?:[—–-]\s*(.*))?$", s, re.S)
    if not m:
        return None, None
    return m.group(1), (m.group(2) or "").strip().replace("`", "")


def header_map(ws):
    hdr = {}
    for c in ws[1]:
        for key, prefix in COLS.items():
            if c.value and str(c.value).startswith(prefix) and key not in hdr:
                hdr[key] = c.column
    missing = [k for k in COLS if k not in hdr]
    if missing:
        sys.exit(f"Sheet Checklist thiếu cột: {missing}")
    return hdr


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--obs", required=True)
    ap.add_argument("--xlsx", required=True)
    ap.add_argument("--sheet", default="Checklist")
    ap.add_argument("--run-dir", required=True)
    ap.add_argument("--failed-dir", required=True)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    obs = parse_obs(a.obs)
    wb = openpyxl.load_workbook(a.xlsx)
    ws = wb[a.sheet]
    h = header_map(ws)
    failed_dir = Path(a.failed_dir)
    count = {"Passed": 0, "Failed": 0, "N/A": 0}
    empty, bad, copied = [], [], 0

    for r in range(2, ws.max_row + 1):
        rid = ws.cell(r, h["id"]).value
        if not rid:
            continue
        if rid not in obs:
            empty.append(f"{rid} (không có trong file quan sát)")
            continue
        verified, imgs = obs[rid]
        if not verified:
            empty.append(rid)
            continue
        res, note = parse_verified(verified)
        if not res:
            bad.append(f"{rid}: {verified[:60]}")
            continue
        count[res] += 1
        ws.cell(r, h["result"]).value = res
        ws.cell(r, h["notes"]).value = note or None
        if res == "Failed":
            ws.cell(r, h["shot"]).value = ", ".join(imgs) or None
            if not a.dry_run:
                failed_dir.mkdir(parents=True, exist_ok=True)
                for f in imgs:
                    src = Path(a.run_dir) / f
                    if src.exists():
                        shutil.copy2(src, failed_dir / f)
                        copied += 1
                    else:
                        bad.append(f"{rid}: thiếu ảnh {src}")
        else:
            ws.cell(r, h["shot"]).value = None

    if not a.dry_run:
        wb.save(a.xlsx)
    print(f"Passed {count['Passed']} · Failed {count['Failed']} · N/A {count['N/A']} · ảnh Failed đã chép {copied}")
    if empty:
        print(f"Chưa có kết quả kiểm chứng ({len(empty)}): {', '.join(empty)}")
    if bad:
        print("Không đọc được / lỗi:\n  " + "\n  ".join(bad))
    print("Lưu ý: mở file bằng Excel/LibreOffice và tính lại công thức (sheet Test Summary) trước khi nộp.")


if __name__ == "__main__":
    main()
