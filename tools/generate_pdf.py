#!/usr/bin/env python3
"""
Simple PDF generator for beginner calculus notes.
Generates `assets/resources/calculus_notes.pdf` from the text in `assets/resources/sample.pdf`.
Requires: reportlab (pip install reportlab)
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch

import sys

SRC = 'assets/resources/sample.pdf'  # text file in this project containing notes
OUT = 'assets/resources/calculus_notes.pdf'


def read_source(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f'Error reading source file: {e}', file=sys.stderr)
        return None


def build_pdf(text, out_path):
    doc = SimpleDocTemplate(out_path, pagesize=letter,
                            rightMargin=72,leftMargin=72,
                            topMargin=72,bottomMargin=72)
    styles = getSampleStyleSheet()
    story = []
    for line in text.split('\n'):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 0.12*inch))
            continue
        # simple header detection
        if line.endswith(':') or line.startswith('1.') or line.startswith('2.'):
            p = Paragraph(f'<b>{line}</b>', styles['Heading3'])
        else:
            p = Paragraph(line.replace('  ', ' &nbsp; '), styles['BodyText'])
        story.append(p)
    try:
        doc.build(story)
        print('PDF generated at', out_path)
    except Exception as e:
        print('Error generating PDF:', e, file=sys.stderr)


if __name__ == '__main__':
    txt = read_source(SRC)
    if not txt:
        print('No source text found at', SRC)
        sys.exit(1)
    build_pdf(txt, OUT)
