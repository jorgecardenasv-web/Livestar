"use server";

import { QuotePDFData } from "../types";
import { generatePDFService } from "../services/generate-pdf.service";
import { getProspect } from "@/features/plans/loaders/get-prospect";

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
      data: (await pdfData) as string,
    };
  } catch (error) {
    console.error("Error detallado:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error generando el PDF",
    };
  }
}
