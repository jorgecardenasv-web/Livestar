"use server";

import { after } from "next/server";
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

    // Enviar correo en segundo plano después de devolver la respuesta
    if (prospect?.email && prospect.email.trim() !== "") {
      const prospectEmail = prospect.email;
      const prospectName = prospect.name || "";
      
      after(async () => {
        try {
          await sendQuoteEmailProspectService({
            prospectName,
            prospectEmail,
            pdfBuffer: typeof pdfData === 'string' ? pdfData : Buffer.from(pdfData),
            company: data.company,
            plan: data.plan,
            redirectUrl: "https://emma-gmm.livestar.mx/cotizar/resumen",
          });
          console.log(`Correo enviado exitosamente a ${prospectEmail}`);
        } catch (emailError) {
          console.error("Error enviando correo en segundo plano:", emailError);
        }
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
