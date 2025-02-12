"use server";

import puppeteer from 'puppeteer';

interface PersonalizationPDF {
    format?: "A4" | "A3" | "Letter";
    width?: string;
    height?: string;
  }

export async function generatePDFAction(
    content: string | Promise<string>,
    format: PersonalizationPDF
  ): Promise<Uint8Array> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      if (typeof content !== "string") {
        content = await content;
      }
  
      await page.setContent(content);
      const pdfBuffer = await page.pdf({
        format: format.format || "A4",
        width: format.width || "210mm",
        height: format.height || "297mm",
        printBackground: true,
      });
      await browser.close();
  
      return pdfBuffer;
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      throw new Error("Error al generar el PDF");
    }
  }