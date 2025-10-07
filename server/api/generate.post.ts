import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { fillTemplateHtml } from '~/utils/template';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    format: 'pdf' | 'docx';
    html: string;
    templateId: string;
    answers: Record<string, unknown>;
  }>(event);

  if (!body?.html || !body?.format) {
    throw createError({ statusCode: 400, statusMessage: 'Format and html are required.' });
  }

  const renderedHtml = fillTemplateHtml(body.html, body.answers ?? {});

  if (body.format === 'pdf') {
    const pdfDoc = await PDFDocument.create();
    let currentPage = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const margin = 50;
    const text = stripHtml(renderedHtml);
    const maxWidth = currentPage.getSize().width - margin * 2;

    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth > maxWidth) {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) {
      lines.push(currentLine);
    }

    let y = currentPage.getSize().height - margin;
    lines.forEach((line) => {
      if (y < margin) {
        currentPage = pdfDoc.addPage();
        y = currentPage.getSize().height - margin;
      }
      currentPage.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
        color: rgb(0.1, 0.1, 0.1)
      });
      y -= fontSize + 6;
    });

    const pdfBytes = await pdfDoc.save();
    setHeader(event, 'Content-Type', 'application/pdf');
    return pdfBytes;
  }

  const paragraphs = stripHtml(renderedHtml)
    .split(/(?<=\.)\s+/)
    .filter((sentence) => sentence.trim().length > 0)
    .map((sentence) =>
      new Paragraph({
        children: [new TextRun({ text: sentence.trim(), size: 24 })],
        spacing: { after: 200 }
      })
    );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs.length ? paragraphs : [new Paragraph('Generated document')]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  return buffer;
});
