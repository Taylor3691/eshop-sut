#!/usr/bin/env python3
"""Chép phiếu ghi phiên (định dạng templates/session-slip-TEMPLATE.txt) vào notes.md và sus-and-metrics.xlsx.

CHỈ CHÉP, KHÔNG THÊM: giá trị nào trong phiếu để trống thì trong notes cũng để trống. Script không suy diễn
kết quả, không sửa lời nói nguyên văn. Dòng bị xuống dòng giữa chừng (do dán từ terminal / chat) được nối lại.

Dùng:
    python3 slip_to_notes.py --slips phieu.txt --task-dir submission/task2-usability \
        [--xlsx submission/task2-usability/sus-and-metrics.xlsx] [--dry-run]
Phiên "PHIÊN: Pilot" ghi vào <task-dir>/pilot/notes.md, các phiên khác vào <task-dir>/sessions/<mã>/notes.md.
"""
import argparse, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from notes_lib import render_notes, sus_score  # noqa: E402

SEC = re.compile(r"^=== (.+?) ===$")
PATTERNS = {
    "hdr": re.compile(r"^[^|]+?: ?.*$"),
    "BƯỚC": re.compile(r"^B\d+ [^:]+:"),
    "QUAN SÁT": re.compile(r"^\d{1,2}:\d\d \|"),
    "SUS": re.compile(r"^\d"),
    "PROBE": re.compile(r"^[A-Z]\d+ \|"),
}


def parse_slips(text):
    sessions, cur, sec, lines = {}, None, None, []

    def flush():
        if cur is None:
            return
        for line in lines:
            if sec == "hdr":
                k, v = line.split(":", 1)
                cur["header"][k.strip()] = v.strip()
            elif sec == "BƯỚC":
                name, rest = line.split(":", 1)
                parts = [x.strip() for x in rest.split(" | ", 4)]
                parts += [""] * (5 - len(parts))
                cur["steps"].append([name.strip()] + parts)
            elif sec == "QUAN SÁT":
                parts = [x.strip() for x in line.split(" | ")]
                if len(parts) != 6:
                    sys.exit(f"[{cur['code']}] dòng quan sát không đủ 6 cột: {line}")
                cur["obs"].append(parts)
            elif sec == "SUS":
                vals = [int(x) for x in re.split(r"[,\s]+", line.strip()) if x]
                if len(vals) != 10 or not all(1 <= v <= 5 for v in vals):
                    sys.exit(f"[{cur['code']}] SUS phải có 10 giá trị 1–5: {line}")
                cur["sus"] = vals
            elif sec == "PROBE":
                q, a = line.split(" | ", 1)
                cur["probe"].append((q.strip(), a.strip()))
        lines.clear()

    for raw in text.splitlines():
        s = raw.strip()
        if not s or s.startswith("#"):
            continue
        m = re.match(r"^=== PHIÊN: (.+?) ===$", s)
        if m:
            flush()
            code = m.group(1).strip()
            cur = {"code": code, "header": {}, "steps": [], "obs": [], "sus": None, "probe": []}
            sessions[code] = cur
            sec = "hdr"
            continue
        m = SEC.match(s)
        if m:
            flush()
            sec = m.group(1).strip()
            continue
        if cur is None:
            continue
        pat = PATTERNS.get(sec)
        if lines and pat and not pat.match(s):
            lines[-1] += " " + s  # dòng bị ngắt giữa chừng
        else:
            lines.append(s)
    flush()
    return sessions


def fill_xlsx(path, sessions):
    import openpyxl
    wb = openpyxl.load_workbook(path)
    ws, tm = wb["SUS"], wb["Task metrics"]
    filled = []
    for r in range(2, ws.max_row + 1):
        code = ws.cell(r, 1).value
        if code in sessions and sessions[code]["sus"]:
            for i, v in enumerate(sessions[code]["sus"]):
                ws.cell(r, 2 + i, v)
            filled.append(f"SUS {code}")
    for r in range(2, tm.max_row + 1):
        code, step = tm.cell(r, 1).value, tm.cell(r, 2).value
        if code not in sessions or not step:
            continue
        idx = int(str(step).split(".")[0]) - 1
        steps = sessions[code]["steps"]
        if idx >= len(steps):
            continue
        _, done, sec, err, hlp, note = steps[idx]
        tm.cell(r, 3, done or None)
        tm.cell(r, 4, int(sec) if sec.isdigit() else (sec or None))
        tm.cell(r, 5, int(err) if err.isdigit() else (err or None))
        tm.cell(r, 6, int(hlp) if hlp.isdigit() else (hlp or None))
        tm.cell(r, 7, note or None)
    wb.save(path)
    return filled


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slips", required=True)
    ap.add_argument("--task-dir", required=True)
    ap.add_argument("--xlsx")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    sessions = parse_slips(Path(a.slips).read_text(encoding="utf-8"))
    task = Path(a.task_dir)
    for code, s in sessions.items():
        md = render_notes(code, s["header"], s["obs"], s["steps"], s["sus"], s["probe"])
        out = task / ("pilot" if code.lower() == "pilot" else f"sessions/{code}") / "notes.md"
        score = f"{sus_score(s['sus']):g}" if s["sus"] else "—"
        print(f"{code}: {len(s['obs'])} quan sát, {len(s['steps'])} bước, {len(s['probe'])} probe, SUS {score} → {out}")
        if not a.dry_run:
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(md, encoding="utf-8")
    if a.xlsx and not a.dry_run:
        fill_xlsx(a.xlsx, sessions)
        print(f"Đã điền {a.xlsx} (công thức SUS chỉ hiện điểm sau khi mở bằng Excel/LibreOffice).")


if __name__ == "__main__":
    main()
