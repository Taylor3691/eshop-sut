#!/usr/bin/env python3
"""Ghép báo cáo chính hw05/REPORT.md từ các phần trong hw05/report/ và REPORT_TASK1/2/3.md.

Chạy lại sau mỗi lần sửa một file thành phần:  python3 hw05/report/build_report.py
"""
import re
from pathlib import Path

HW = Path(__file__).resolve().parent.parent
PARTS = HW / "report"


def demote(md: str, drop_title: bool = True, keep_intro: bool = False) -> str:
    """Bỏ tiêu đề cấp 1 và phần mô tả ngay dưới nó (tới dòng --- đầu tiên; giữ lại nếu keep_intro), hạ mọi tiêu đề một cấp."""
    lines = md.splitlines()
    if keep_intro and lines and lines[0].startswith("# "):
        lines = [l for l in lines[1:]]
        if "---" in lines:
            lines.remove("---")
    elif drop_title and lines and lines[0].startswith("# "):
        try:
            cut = lines.index("---")
            lines = lines[cut + 1:]
        except ValueError:
            lines = lines[1:]
    out, fence = [], False
    for line in lines:
        if line.startswith("```"):
            fence = not fence
        if not fence and re.match(r"^#{1,5} ", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out).strip() + "\n"


def section(title: str, body: str) -> str:
    return f"\n---\n\n## {title}\n\n{body.strip()}\n"


doc = (PARTS / "00_header.md").read_text(encoding="utf-8").strip() + "\n"
doc += section("Phần 1 – Task 1: Thiết kế và thực thi kiểm thử hiệu năng", demote((HW / "REPORT_TASK1.md").read_text(encoding="utf-8")))
doc += section("Phần 2 – Task 2: AI phân tích kết quả và săn lỗi đọc sai", demote((HW / "REPORT_TASK2.md").read_text(encoding="utf-8"), keep_intro=True))
doc += section("Phần 3 – Agent Skill", (PARTS / "30_skill.md").read_text(encoding="utf-8"))
doc += section("Phần 4 – Kết luận và đề xuất Continuous Performance Testing (Task 3)",
               (PARTS / "40_conclusion.md").read_text(encoding="utf-8") + "\n\n" + demote((HW / "REPORT_TASK3.md").read_text(encoding="utf-8")))
doc += section("Phần 5 – AI Critique", demote((HW / "AI_CRITIQUE.md").read_text(encoding="utf-8"), keep_intro=True))
doc += section("Phần 6 – AI Audit Report", (PARTS / "60_ai_audit.md").read_text(encoding="utf-8"))
(HW / "REPORT.md").write_text(doc, encoding="utf-8")
print(f"Đã ghi {HW / 'REPORT.md'} ({len(doc.splitlines())} dòng)")
