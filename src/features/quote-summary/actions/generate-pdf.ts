"use server";

import { QuotePDFData } from "../types";
import { generatePDFService } from "../services/generate-pdf.service";
import { sendQuoteEmailProspectService } from "@/features/quote/services/send-email/send-quote-email.service";

export async function generatePDFAction(
  data: QuotePDFData,
  prospect?: { name?: string; email?: string }
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const pdfData = await generatePDFService(data, "datauri");
    if (!pdfData) {
      throw new Error("No se pudo generar el PDF");
    }

    if (prospect?.email) {
      await sendQuoteEmailProspectService({
        prospectName: prospect?.name || "",
        prospectEmail: prospect.email,
        pdfBuffer: typeof pdfData === 'string' ? pdfData : Buffer.from(pdfData),
        company: data.company,
        plan: data.plan,
        redirectUrl: "https://emma-gmm.livestar.mx/cotizar/resumen",
      });
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
