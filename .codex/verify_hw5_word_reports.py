from pathlib import Path

from docx import Document
from docx.shared import Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
FILES = [
    ROOT / "23120117_HW05_AI_Performance_100" / "Main Report.docx",
    ROOT / "23120117_HW05_AI_Performance_100" / "AI Critique" / "AI Critique.docx",
    ROOT / "23120117_HW05_AI_Performance_100" / "AI Audit Report" / "AI Audit Report.docx",
]


def paragraphs(document):
    for paragraph in document.paragraphs:
        yield paragraph
    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                yield from cell.paragraphs


for path in FILES:
    document = Document(path)
    text_runs = 0
    heading_runs = 0
    body_runs = 0
    errors = []
    for paragraph in paragraphs(document):
        is_heading = paragraph.style.name == "Title" or paragraph.style.name.startswith("Heading")
        for run in paragraph.runs:
            if not run.text:
                continue
            text_runs += 1
            if run.font.name != "Times New Roman":
                errors.append(f"font {run.font.name!r} in {run.text[:30]!r}")
            if run.font.color.rgb != RGBColor(0, 0, 0):
                errors.append(f"non-black text in {run.text[:30]!r}")
            expected_size = Pt(14) if is_heading else Pt(13)
            if run.font.size != expected_size:
                errors.append(f"size {run.font.size} expected {expected_size} in {run.text[:30]!r}")
            if is_heading:
                heading_runs += 1
                if run.font.bold is not True:
                    errors.append(f"heading not bold in {run.text[:30]!r}")
            else:
                body_runs += 1
    if errors:
        raise RuntimeError(f"{path.name}: formatting errors: {errors[:5]}")
    print(f"{path.name}: {text_runs} text runs verified; {heading_runs} heading runs at 14pt bold; {body_runs} body runs at 13pt.")
