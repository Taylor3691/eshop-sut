from __future__ import annotations

import re
from pathlib import Path

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
BLACK = RGBColor(0, 0, 0)
FONT = "Times New Roman"
BODY_SIZE = Pt(13)
HEADING_SIZE = Pt(14)

SOURCES = [
    (ROOT / "23120117_HW05_AI_Performance_100" / "Main Report.md", ROOT / "23120117_HW05_AI_Performance_100" / "Main Report.docx"),
    (ROOT / "23120117_HW05_AI_Performance_100" / "AI Critique" / "AI Critique.md", ROOT / "23120117_HW05_AI_Performance_100" / "AI Critique" / "AI Critique.docx"),
    (ROOT / "23120117_HW05_AI_Performance_100" / "AI Audit Report" / "AI Audit Report.md", ROOT / "23120117_HW05_AI_Performance_100" / "AI Audit Report" / "AI Audit Report.docx"),
]


def set_run_font(run, size, bold=False, italic=False, mono=False):
    # The submission requirement specifies Times New Roman for every textual element,
    # including code snippets and inline code.
    run.font.name = FONT
    run._element.rPr.rFonts.set(qn("w:ascii"), FONT)
    run._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
    run._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
    run.font.size = size
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = BLACK


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill)
    tc_pr.append(shading)


def set_cell_borders(cell, color="D9D9D9"):
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        tag = "w:" + edge
        element = borders.find(qn(tag))
        if element is None:
            element = OxmlElement(tag)
            borders.append(element)
        element.set(qn("w:val"), "single")
        element.set(qn("w:sz"), "4")
        element.set(qn("w:color"), color)


def plain_markdown(text: str) -> str:
    text = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", text)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = text.replace("**", "").replace("__", "")
    return text


def add_inline(paragraph, text: str, size=BODY_SIZE, heading=False, mono=False, italic=False):
    # Keep all characters while applying only simple Markdown bold/italic formatting.
    pattern = re.compile(r"(\*\*.*?\*\*|__.*?__|`.*?`|\*[^*]+?\*)")
    pos = 0
    for match in pattern.finditer(text):
        if match.start() > pos:
            run = paragraph.add_run(text[pos:match.start()])
            set_run_font(run, size, bold=heading, italic=italic, mono=mono)
        token = match.group(0)
        if token.startswith("**") or token.startswith("__"):
            content, bold, token_italic, code = token[2:-2], True, italic, False
        elif token.startswith("`"):
            content, bold, token_italic, code = token[1:-1], heading, italic, True
        else:
            content, bold, token_italic, code = token[1:-1], heading, True, False
        run = paragraph.add_run(content)
        set_run_font(run, size, bold=bold, italic=token_italic, mono=mono or code)
        pos = match.end()
    if pos < len(text) or not text:
        run = paragraph.add_run(text[pos:])
        set_run_font(run, size, bold=heading, italic=italic, mono=mono)


def add_table(document: Document, rows: list[str]):
    parsed = []
    for row in rows:
        values = [plain_markdown(part.strip()) for part in row.strip().strip("|").split("|")]
        parsed.append(values)
    if len(parsed) > 1 and all(re.fullmatch(r":?-{3,}:?", value.replace(" ", "")) for value in parsed[1]):
        parsed.pop(1)
    if not parsed:
        return
    width = max(len(row) for row in parsed)
    table = document.add_table(rows=len(parsed), cols=width)
    table.style = "Table Grid"
    for row_index, values in enumerate(parsed):
        for col_index in range(width):
            cell = table.cell(row_index, col_index)
            cell.text = ""
            cell_paragraph = cell.paragraphs[0]
            cell_paragraph.paragraph_format.space_after = Pt(0)
            add_inline(cell_paragraph, values[col_index] if col_index < len(values) else "", size=BODY_SIZE, heading=row_index == 0)
            set_cell_borders(cell)
            if row_index == 0:
                set_cell_shading(cell, "D9EAF7")
    document.add_paragraph()


def configure(document: Document):
    section = document.sections[0]
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)

    styles = document.styles
    for style_name in ["Normal", "Title", "Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5", "Heading 6"]:
        style = styles[style_name]
        style.font.name = FONT
        style._element.rPr.rFonts.set(qn("w:ascii"), FONT)
        style._element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
        style._element.rPr.rFonts.set(qn("w:eastAsia"), FONT)
        style.font.color.rgb = BLACK
        if style_name == "Normal":
            style.font.size = BODY_SIZE
        else:
            style.font.size = HEADING_SIZE
            style.font.bold = True
    styles["Normal"].paragraph_format.space_after = Pt(6)
    styles["Normal"].paragraph_format.line_spacing = 1.15
    for style_name in ["Title", "Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5", "Heading 6"]:
        styles[style_name].paragraph_format.space_before = Pt(10)
        styles[style_name].paragraph_format.space_after = Pt(5)


def add_image(document: Document, source_path: Path, alt_text: str):
    paragraph = document.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if source_path.exists():
        paragraph.add_run().add_picture(str(source_path), width=Inches(6.3))
    else:
        add_inline(paragraph, f"[Image not found: {alt_text}]", size=BODY_SIZE)
    caption = document.add_paragraph()
    caption.alignment = WD_ALIGN_PARAGRAPH.CENTER
    add_inline(caption, alt_text, size=BODY_SIZE, italic=True)


def convert(source: Path, destination: Path):
    lines = source.read_text(encoding="utf-8").splitlines()
    document = Document()
    configure(document)
    destination.parent.mkdir(parents=True, exist_ok=True)

    index = 0
    in_code = False
    while index < len(lines):
        line = lines[index]
        if line.startswith("```"):
            in_code = not in_code
            index += 1
            continue
        if in_code:
            paragraph = document.add_paragraph()
            paragraph.paragraph_format.space_after = Pt(0)
            add_inline(paragraph, line, size=BODY_SIZE, mono=True)
            index += 1
            continue
        if not line.strip():
            index += 1
            continue
        image_match = re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", line.strip())
        if image_match:
            add_image(document, (source.parent / image_match.group(2)).resolve(), image_match.group(1))
            index += 1
            continue
        heading = re.match(r"^(#{1,6})\s+(.*)$", line)
        if heading:
            level = len(heading.group(1))
            title = plain_markdown(heading.group(2).strip())
            style = "Title" if level == 1 and index == 0 else f"Heading {min(level, 6)}"
            paragraph = document.add_paragraph(style=style)
            if style == "Title":
                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            add_inline(paragraph, title, size=HEADING_SIZE, heading=True)
            index += 1
            continue
        if line.lstrip().startswith("|") and line.rstrip().endswith("|"):
            table_lines = []
            while index < len(lines) and lines[index].lstrip().startswith("|") and lines[index].rstrip().endswith("|"):
                table_lines.append(lines[index])
                index += 1
            add_table(document, table_lines)
            continue
        bullet = re.match(r"^\s*[-*+]\s+(.*)$", line)
        numbered = re.match(r"^\s*(\d+)\.\s+(.*)$", line)
        quote = re.match(r"^>\s?(.*)$", line)
        if bullet:
            paragraph = document.add_paragraph(style="List Bullet")
            add_inline(paragraph, bullet.group(1), size=BODY_SIZE)
        elif numbered:
            paragraph = document.add_paragraph(style="List Number")
            add_inline(paragraph, numbered.group(2), size=BODY_SIZE)
        elif quote:
            paragraph = document.add_paragraph()
            paragraph.paragraph_format.left_indent = Inches(0.25)
            add_inline(paragraph, quote.group(1), size=BODY_SIZE, italic=True)
        elif re.fullmatch(r"\s*(-{3,}|\*{3,}|_{3,})\s*", line):
            pass
        else:
            paragraph = document.add_paragraph()
            add_inline(paragraph, line, size=BODY_SIZE)
        index += 1

    document.core_properties.title = source.stem
    document.core_properties.subject = "HW05 submission report"
    document.save(destination)


def markdown_payloads(source: Path):
    payloads = []
    for raw in source.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("```") or (len(line) >= 3 and set(line) <= {"-", "*", "_"}):
            continue
        image = re.fullmatch(r"!\[([^\]]*)\]\([^)]+\)", line)
        if image:
            payloads.append(image.group(1))
            continue
        line = re.sub(r"^#{1,6}\s+", "", line)
        line = re.sub(r"^>\s?", "", line)
        line = re.sub(r"^(?:[-*+]\s+|\d+\.\s+)", "", line)
        if line.startswith("|") and line.endswith("|"):
            compact = line.strip("|").replace("|", "").replace(" ", "").replace(":", "")
            if compact and set(compact) <= {"-"}:
                continue
            payloads.extend(part.strip() for part in line.strip("|").split("|"))
        else:
            payloads.append(line)
    return [plain_markdown(value) for value in payloads if len(plain_markdown(value).strip()) > 2]


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def verify_content(source: Path, destination: Path):
    doc = Document(destination)
    chunks = [paragraph.text for paragraph in doc.paragraphs]
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                chunks.append(cell.text)
    all_text = normalize("\n".join(chunks))
    missing = [payload for payload in markdown_payloads(source) if normalize(payload) not in all_text]
    if missing:
        raise RuntimeError(f"{destination.name}: {len(missing)} source payloads were not preserved; first: {missing[:3]}")
    return len(markdown_payloads(source)), len(chunks)


if __name__ == "__main__":
    for markdown, word in SOURCES:
        convert(markdown, word)
        source_payload_count, document_chunk_count = verify_content(markdown, word)
        print(f"{word} | verified {source_payload_count} source payloads in {document_chunk_count} document chunks")
