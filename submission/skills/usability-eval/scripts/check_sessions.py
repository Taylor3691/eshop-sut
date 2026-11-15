#!/usr/bin/env python3
"""Kiểm tính nhất quán của notes các phiên usability trước khi phân tích. Không sửa file nào, chỉ báo.

Kiểm:
  1. Tổng thời gian các bước = Kết thúc − Bắt đầu (lệch > --tolerance giây thì báo)
  2. Mốc thời gian của mỗi quan sát nằm trong khoảng thời gian của bước ghi kèm
  3. Mã loại quan sát thuộc danh sách cho phép (--codes) và mức độ trong 1..3
  4. Hoàn thành chỉ là Y / A / N (hoặc Assisted); SUS đủ 10 giá trị 1..5
  5. Bước ghi Y/A nhưng thời gian vượt mức tối đa (--max) → báo để người điều phối quyết
  6. Bước có số lần trợ giúp > 0 nhưng ghi Y → báo
  7. Mỗi chủ đề probe (C, E, S, T) có ít nhất 1 câu trả lời

Dùng:
    python3 check_sessions.py --task-dir submission/task2-usability --max 180,180,420,480,240,120 [--pilot]
"""
import argparse, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from notes_lib import find_notes, parse_notes, to_sec  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--task-dir", required=True)
    ap.add_argument("--max", help="thời gian tối đa từng bước (giây), cách nhau bằng dấu phẩy")
    ap.add_argument("--codes", default="H,E,F", help="mã loại quan sát cho phép")
    ap.add_argument("--themes", default="C,E,S,T", help="chủ đề probe bắt buộc")
    ap.add_argument("--tolerance", type=int, default=0)
    ap.add_argument("--pilot", action="store_true", help="kiểm cả pilot/notes.md")
    a = ap.parse_args()

    mx = [int(x) for x in a.max.split(",")] if a.max else None
    codes = set(a.codes.split(","))
    total = 0
    for f in find_notes(a.task_dir, a.pilot):
        d = parse_notes(f)
        issues = []
        steps = d["steps"]
        if not steps:
            issues.append("chưa có bảng kết quả từng bước")
        h = d["header"]
        if steps and h.get("Bắt đầu") and h.get("Kết thúc"):
            dur = to_sec(h["Kết thúc"]) - to_sec(h["Bắt đầu"])
            s = sum(x["sec"] for x in steps)
            if abs(dur - s) > a.tolerance:
                issues.append(f"tổng thời gian các bước {s}s ≠ thời lượng phiên {dur}s")
        ends, acc = {}, 0
        for x in steps:
            ends[x["n"]] = (acc, acc + x["sec"])
            acc += x["sec"]
        for o in d["obs"]:
            t = to_sec(o["t"])
            if o["step"] in ends and not (ends[o["step"]][0] <= t <= ends[o["step"]][1]):
                lo, hi = ends[o["step"]]
                issues.append(f"quan sát {o['t']} ghi B{o['step']} nhưng B{o['step']} kéo dài {lo}–{hi}s")
            if o["type"] not in codes:
                issues.append(f"quan sát {o['t']}: mã loại '{o['type']}' không thuộc {sorted(codes)}")
            if not 1 <= o["sev"] <= 3:
                issues.append(f"quan sát {o['t']}: mức độ {o['sev']} ngoài 1..3")
        for x in steps:
            if x["done"] not in ("Y", "A", "N", "Assisted"):
                issues.append(f"B{x['n']}: hoàn thành '{x['done']}' không hợp lệ")
            if mx and x["n"] <= len(mx) and x["done"] in ("Y", "A", "Assisted") and x["sec"] > mx[x["n"] - 1]:
                issues.append(f"B{x['n']}: {x['sec']}s vượt tối đa {mx[x['n'] - 1]}s nhưng ghi {x['done']} (người điều phối xác nhận)")
            if x["help"] > 0 and x["done"] == "Y":
                issues.append(f"B{x['n']}: có {x['help']} lần trợ giúp nhưng ghi Y")
        if d["sus"] is None:
            issues.append("thiếu hoặc sai định dạng dòng SUS")
        got = {p["q"][0] for p in d["probe"]}
        miss = [t for t in a.themes.split(",") if t not in got]
        if miss:
            issues.append(f"probe thiếu chủ đề {miss}")
        total += len(issues)
        print(f"{d['code']}: " + ("OK" if not issues else f"{len(issues)} vấn đề"))
        for i in issues:
            print(f"   - {i}")
    print(f"\nTổng: {total} vấn đề cần xem.")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
