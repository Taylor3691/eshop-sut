"""Export the three required Markdown reports using bundled Python/reportlab.

Run with Python from Codex workspace dependencies, or install reportlab locally.
The source Markdown remains the canonical editable artifact.
"""
from pathlib import Path
from html import escape
import re
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, LongTable, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path('/System/Library/Fonts/Supplemental')
for name, filename in [('Arial','Arial.ttf'), ('Arial-Bold','Arial Bold.ttf'), ('Arial-Italic','Arial Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR/filename)))
pdfmetrics.registerFontFamily('Arial', normal='Arial', bold='Arial-Bold', italic='Arial-Italic', boldItalic='Arial-Bold')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='BodyVN', fontName='Arial', fontSize=9.5, leading=14, spaceAfter=7, splitLongWords=True))
styles.add(ParagraphStyle(name='CellVN', parent=styles['BodyVN'], fontSize=8, leading=11, spaceAfter=0))
styles.add(ParagraphStyle(name='QuoteVN', parent=styles['BodyVN'], leftIndent=12, textColor=colors.HexColor('#374151')))
for name,size in [('Heading1',18),('Heading2',13),('Heading3',11)]:
    styles[name].fontName='Arial-Bold'; styles[name].fontSize=size; styles[name].leading=size*1.3
    styles[name].spaceBefore=12; styles[name].spaceAfter=8
    styles[name].keepWithNext=True

def inline(s):
    # Escape all markup, then enable the limited Markdown emphasis used here.
    s=escape(s)
    s=re.sub(r'`([^`]+)`',r'<font color="#234b70">\1</font>',s)
    s=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'\[([^]]+)\]\(([^)]+)\)',r'\1 (\2)',s)
    return s

def footer(c,doc):
    c.saveState();c.setFont('Arial',8);c.setFillColor(colors.HexColor('#64748b'))
    c.drawString(40,24,'HW02 | Huỳnh Thái Toàn | 23120175')
    c.drawRightString(A4[0]-40,24,str(doc.page));c.restoreState()

def export(source):
    target=source.with_suffix('.pdf')
    doc=SimpleDocTemplate(str(target), pagesize=A4, rightMargin=40,leftMargin=40,topMargin=36,bottomMargin=40,
                          title=source.stem,author='Huỳnh Thái Toàn')
    lines=source.read_text().splitlines();story=[];i=0;code=False
    while i<len(lines):
        line=lines[i];i+=1
        if line.startswith('```'):code=not code;continue
        if not line.strip():continue
        if line.startswith('|'):
            block=[line]
            while i<len(lines) and lines[i].startswith('|'):
                block.append(lines[i]);i+=1
            data=[]
            for row in block:
                if re.fullmatch(r'[| :\-]+',row):continue
                cells=row.strip().strip('|').split('|')
                data.append([Paragraph(inline(c.strip()),styles['CellVN']) for c in cells])
            if data:
                n=max(map(len,data));data=[row+[Paragraph('',styles['CellVN'])]*(n-len(row)) for row in data]
                table=LongTable(data,colWidths=[doc.width/n]*n,repeatRows=1,hAlign='LEFT')
                table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e2e8f0')),
                    ('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.35,colors.HexColor('#94a3b8')),
                    ('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),
                    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
                story.extend([table,Spacer(1,9)])
            continue
        h=re.match(r'^(#{1,3})\s+(.*)',line)
        if h:story.append(Paragraph(inline(h[2]),styles['Heading'+str(len(h[1]))]));continue
        quote=line.startswith('>')
        if quote:line=line.lstrip('> ')
        if line.startswith('- '):line='• '+line[2:]
        story.append(Paragraph(inline(line),styles['QuoteVN' if quote else 'BodyVN']))
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    print(target)

if __name__=='__main__':
    for name in ['main-report','ai-audit-report','ai-critique']:
        export(ROOT/'docs'/f'{name}.md')
