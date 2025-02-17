"use server";

import { redirect } from "next/navigation";
import { PrismaError } from "@/shared/errors/prisma";
import { cookies } from "next/headers";
import { createQuoteService } from "../services/create/create-quote.service";
import { getAdvisorWithLeastQuotesService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import { generatePDFService } from "@/features/quote-summary/services/generate-pdf.service";
import { sendQuoteEmailService } from "../services/send-email/send-quote-email.service";
import { processPDFData } from "@/features/quote-summary/utils/process-pdf-data.util";
import { revalidatePath } from "next/cache";
import { prefix } from "@/features/layout/nav-config/constants";

export const createQuoteAction = async (payload: any) => {
  try {
    const { prospectData, medicalData } = payload;
    const cookieStore = cookies();
    const selectedPlan = cookieStore.get("selectedPlan")?.value;
    const parsedPlan = JSON.parse(selectedPlan!);

    const advisor = await getAdvisorWithLeastQuotesService();

    if (prospectData) {
      await createQuoteService(
        {
          prospectData,
          medicalData,
          plan: parsedPlan,
        },
        advisor?.id!
      );

      try {
        const pdfData = processPDFData(parsedPlan);
        const pdfBuffer = generatePDFService(pdfData, "arraybuffer");
        const buffer = Buffer.from(new Uint8Array(pdfBuffer as ArrayBuffer));

        await sendQuoteEmailService({
          prospectName: prospectData.name,
          prospectEmail: prospectData.email,
          whatsapp: prospectData.whatsapp,
          pdfBuffer: buffer,
          company: parsedPlan.company,
          plan: parsedPlan.plan,
          advisorName: advisor?.name,
          advisorEmail: advisor?.email ?? "emma@livestar.mx",
        });

        console.log("Emails enviados correctamente");
      } catch (pdfError) {
        console.error("Error generando o enviando PDF:", pdfError);
      }

      cookieStore.delete("prospect");
      cookieStore.delete("selectedPlan");
      cookieStore.delete("activePlanType");
      cookieStore.delete("activePaymentType");
    }
  } catch (error) {
    console.error("Error en createQuoteAction:", error);
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear el historial médico.",
    };
  }
  revalidatePath(`${prefix}/cotizaciones`);
  redirect("/cotizar");
};
