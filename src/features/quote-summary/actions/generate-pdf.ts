"use server";

import { QuotePDFData } from "../types";
import { generatePDFService } from "../services/generate-pdf.service";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { sendQuoteEmailProspectService } from "@/features/quote/services/send-email/send-quote-email.service";

export async function generatePDFAction(
  data: QuotePDFData
): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const pdfData = await generatePDFService(data, "datauri");
    const { prospect } = await getProspect();
    if (!pdfData) {
      throw new Error("No se pudo generar el PDF");
    }

    await sendQuoteEmailProspectService({
          prospectName: prospect.name,
          prospectEmail: prospect.email,
          pdfBuffer: pdfData,
          company: data.company,
          plan: data.plan,
          redirectUrl: `${process.env.BASE_URL}/cotizar/resumen`
        });
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
