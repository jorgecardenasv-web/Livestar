"use server";

import { QuotePDFData } from "../types";
import { generatePDFService } from "../services/generate-pdf.service";

export async function generatePDFAction(
  data: QuotePDFData
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const pdfData = generatePDFService(data, "datauri");

    if (!pdfData) {
      throw new Error("No se pudo generar el PDF");
    }

    return {
      success: true,
      data: pdfData as string,
    };
  } catch (error) {
    console.error("Error detallado:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error generando el PDF",
    };
  }
}
