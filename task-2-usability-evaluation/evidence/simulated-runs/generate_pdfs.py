from pathlib import Path
import re
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("Arial", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", "C:/Windows/Fonts/ariali.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold", italic="Arial-Italic", boldItalic="Arial-Bold")

NAVY = colors.HexColor("#17324D")
BLUE = colors.HexColor("#1769AA")
PALE = colors.HexColor("#EAF2F8")
GRAY = colors.HexColor("#52606D")
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Title2", parent=styles["Title"], fontName="Arial-Bold", fontSize=20, leading=25, textColor=NAVY, spaceAfter=15))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Arial-Bold", fontSize=15, leading=19, textColor=NAVY, spaceBefore=12, spaceAfter=7))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Arial-Bold", fontSize=12, leading=15, textColor=BLUE, spaceBefore=9, spaceAfter=5))
styles.add(ParagraphStyle(name="H3x", parent=styles["Heading3"], fontName="Arial-Bold", fontSize=10, leading=13, textColor=NAVY, spaceBefore=7, spaceAfter=4))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontName="Arial", fontSize=9.2, leading=13, textColor=colors.HexColor("#263238"), spaceAfter=6, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="Bulletx", parent=styles["Bodyx"], leftIndent=13, firstLineIndent=-8, spaceAfter=3))
styles.add(ParagraphStyle(name="Quotex", parent=styles["Bodyx"], leftIndent=10, borderColor=BLUE, borderWidth=1, borderPadding=6, backColor=PALE, textColor=GRAY, spaceBefore=4, spaceAfter=7))
styles.add(ParagraphStyle(name="Smallx", parent=styles["Bodyx"], fontSize=7.4, leading=9))

def inline(text):
    text = escape(text.strip().replace("—", "-").replace("–", "-").replace("‑", "-"))
    code = []
    def hold_code(match):
        code.append(match.group(1))
        return f"@@CODE{len(code)-1}@@"
    text = re.sub(r"`([^`]+)`", hold_code, text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    for idx, value in enumerate(code):
        text = text.replace(f"@@CODE{idx}@@", f"<font name='Arial-Bold'>{value}</font>")
    return text

def parse_md(source):
    lines = source.splitlines()
    story, para, table = [], [], []
    fenced = False

    def flush_para():
        nonlocal para
        if para:
            text = " ".join(x.strip() for x in para)
            story.append(Paragraph(inline(text), styles["Bodyx"]))
            para = []

    def flush_table():
        nonlocal table
        if not table:
            return
        rows = []
        for row_idx, line in enumerate(table):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if cells and all(re.fullmatch(r":?-{3,}:?", c) for c in cells):
                continue
            if row_idx == 0:
                rows.append([Paragraph(f"<font color='#FFFFFF'><b>{inline(c)}</b></font>", styles["Smallx"]) for c in cells])
            else:
                rows.append([Paragraph(inline(c), styles["Smallx"]) for c in cells])
        if rows:
            n = max(len(r) for r in rows)
            rows = [r + [Paragraph("", styles["Smallx"])] * (n-len(r)) for r in rows]
            widths = [(A4[0] - 36*mm) / n] * n
            t = Table(rows, colWidths=widths, repeatRows=1, hAlign="LEFT")
            t.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,0), NAVY),
                ("TEXTCOLOR", (0,0), (-1,0), colors.white),
                ("FONTNAME", (0,0), (-1,0), "Arial-Bold"),
                ("BACKGROUND", (0,1), (-1,-1), colors.white),
                ("GRID", (0,0), (-1,-1), .35, colors.HexColor("#CBD5DF")),
                ("VALIGN", (0,0), (-1,-1), "TOP"),
                ("LEFTPADDING", (0,0), (-1,-1), 5),
                ("RIGHTPADDING", (0,0), (-1,-1), 5),
                ("TOPPADDING", (0,0), (-1,-1), 4),
                ("BOTTOMPADDING", (0,0), (-1,-1), 4),
            ]))
            story.append(KeepTogether([t, Spacer(1, 7)]))
        table = []

    for line in lines:
        if line.startswith("```"):
            flush_para(); flush_table(); fenced = not fenced
            continue
        if fenced:
            continue
        if line.startswith("|") and "|" in line[1:]:
            flush_para(); table.append(line); continue
        flush_table()
        if not line.strip() or line.strip() == "---":
            flush_para(); continue
        if line.startswith("# "):
            flush_para(); story.append(Paragraph(inline(line[2:]), styles["Title2"])); continue
        if line.startswith("## "):
            flush_para(); story.append(Paragraph(inline(line[3:]), styles["H1x"])); continue
        if line.startswith("### "):
            flush_para(); story.append(Paragraph(inline(line[4:]), styles["H2x"])); continue
        if line.startswith("#### "):
            flush_para(); story.append(Paragraph(inline(line[5:]), styles["H3x"])); continue
        if line.startswith(">"):
            flush_para(); story.append(Paragraph(inline(line.lstrip("> ")), styles["Quotex"])); continue
        if re.match(r"^\s*[-*] ", line):
            flush_para(); story.append(Paragraph("• " + inline(re.sub(r"^\s*[-*] ", "", line)), styles["Bulletx"])); continue
        if re.match(r"^\s*\d+\. ", line):
            flush_para(); story.append(Paragraph(inline(line.strip()), styles["Bulletx"])); continue
        para.append(line)
    flush_para(); flush_table()
    return story

def footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(colors.HexColor("#D6DEE6"))
    canvas.line(18*mm, 15*mm, w-18*mm, 15*mm)
    canvas.setFont("Arial", 7.5)
    canvas.setFillColor(GRAY)
    canvas.drawString(18*mm, 10*mm, "HW03 Bài 2 | SIMULATED DATA")
    canvas.drawRightString(w-18*mm, 10*mm, f"Page {doc.page}")
    canvas.restoreState()

def build(name, sources):
    story = []
    for idx, file in enumerate(sources):
        if idx:
            story.append(Spacer(1, 10))
        story.extend(parse_md(file.read_text(encoding="utf-8")))
    doc = SimpleDocTemplate(str(OUT/name), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=21*mm, title=name.replace("_", " "), author="Codex - simulated artifact")
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT/name)

build("main-report-simulated.pdf", [ROOT/"analysis/main-report.md"])
build("ai-audit-simulated.pdf", [ROOT/"ai-audit/ai-audit-log.md", ROOT/"ai-audit/simulated-execution-addendum.md", ROOT/"ai-audit/synthetic-data-addendum.md"])
build("ai-critique-simulated.pdf", [ROOT/"ai-audit/ai-critique.md"])
