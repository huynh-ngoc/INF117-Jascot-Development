// src/app/api/location-report-pdf/route.js
import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // navigate to your front-end report
  await page.goto('http://localhost:3000/location-reports', {
    waitUntil: 'networkidle0',
  });

  // hide nav/sidebar if you need
  await page.addStyleTag({
    content: `
      nav, header, .sidebar-wrapper { display: none !important; }
      body { margin:0; padding:0; }
    `,
  });

  // generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="property-comparison.pdf"',
    },
  });
}
