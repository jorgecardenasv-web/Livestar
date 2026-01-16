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

export const createQuoteAction = async (
  payload: any,
  options?: { deleteCookies?: boolean; redirectTo?: string; setCreatedCookie?: boolean; disableRedirect?: boolean }
) => {
  let createdQuoteId: string | undefined;
  try {
    const { prospectData, medicalData } = payload;
    const cookieStore = await cookies();
    const selectedPlan = cookieStore.get("selectedPlan")?.value;
    const parsedPlan = JSON.parse(selectedPlan!);

    const advisor = await getAdvisorWithLeastQuotesService();

    // Si no se proporciona prospectData explícitamente, intentar obtenerlo desde la cookie 'prospect'
    const resolvedProspectData = prospectData ?? (() => {
      const prospectJson = cookieStore.get("prospect")?.value;
      const prospect = prospectJson ? JSON.parse(prospectJson) : null;
      return prospect ? { ...prospect, additionalInfo: prospect.additionalInfo } : null;
    })();

    if (resolvedProspectData) {
      const created = await createQuoteService(
        {
          prospectData: resolvedProspectData,
          medicalData: medicalData ?? [],
          plan: parsedPlan,
        },
        advisor?.id!
      );
      createdQuoteId = created?.id;

      try {
        const pdfData = processPDFData(parsedPlan, resolvedProspectData);
        const pdfBuffer = await generatePDFService(pdfData, "arraybuffer");
        const buffer = Buffer.from(new Uint8Array(pdfBuffer as ArrayBuffer));

        await sendQuoteEmailService({
          prospectName: resolvedProspectData.name,
          prospectEmail: resolvedProspectData.email,
          whatsapp: resolvedProspectData.whatsapp,
          pdfBuffer: buffer,
          company: parsedPlan.company,
          plan: parsedPlan.plan,
          advisorName: advisor?.name,
          advisorEmail: advisor?.email ?? "emma@livestar.mx",
        });
      } catch (pdfError) {
        console.error("Error generando o enviando PDF:", pdfError);
      }

      const shouldDeleteCookies = options?.deleteCookies ?? true;
      if (shouldDeleteCookies) {
        cookieStore.delete("prospect");
        cookieStore.delete("selectedPlan");
        cookieStore.delete("activePlanType");
        cookieStore.delete("activePaymentType");
      } else if (options?.setCreatedCookie) {
        cookieStore.set("quoteCreated", "true");
        if (created?.id) {
          cookieStore.set("createdQuoteId", created.id);
        }
      }
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
  if (options?.disableRedirect) {
    return { success: true, quoteId: createdQuoteId };
  }

  const redirectTo = options?.redirectTo ?? "/cotizar";
  if (options?.setCreatedCookie && createdQuoteId) {
    redirect(`${redirectTo}?quoteId=${createdQuoteId}`);
  } else {
    redirect(redirectTo);
  }
};
