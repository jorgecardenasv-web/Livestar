"use server";

import { getAdvisorWithLeastQuotesService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import { createQuoteService } from "@/features/quote/services/create/create-quote.service";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Plan {
  id: string;
  company: string;
  plan: string;
  coverage_fee: number | string;
  paymentType: string;
  sumInsured: number | string;
  deductible: number | string;
  coInsurance: number | string;
  coInsuranceCap: number | string;
  individualPricesJson?: string;
  isMultipleString?: string;
  deductiblesJson?: string;
  isMultipleCoInsurance?: string;
  coInsuranceJson?: string;
  coInsuranceCapJson?: string;
  companyId?: string;
  companyLogo?: string;
  planTypeId?: string;
  planTypeName?: string;
  prices?: any;
  deductibles?: any;
  isRecommended?: boolean;
}

export async function handleInterestClick(formData: FormData) {
  const insuranceData = Object.fromEntries(formData) as unknown as Plan;

  const cookieStore = cookies();
  const prospect = cookieStore.get("prospect")?.value;
  const parsedProspect = JSON.parse(prospect!);

  const advisor = await getAdvisorWithLeastQuotesService();
  const medicalData = [{ set: [] }] as Prisma.JsonArray;

  if (parsedProspect) {
    await createQuoteService(
      {
        prospectData: parsedProspect,
        medicalData,
        plan: insuranceData,
      },
      advisor?.id!
    );

    // TODO: Descomentar esta función cuando se vaya a usar, es para enviar el correo.
    // try {
    //   const pdfData = processPDFData(parsedPlan);
    //   const pdfBuffer = await generatePDFService(pdfData, "arraybuffer");
    //   const buffer = Buffer.from(new Uint8Array(pdfBuffer as ArrayBuffer));

    //   await sendQuoteEmailService({
    //     prospectName: prospectData.name,
    //     prospectEmail: prospectData.email,
    //     whatsapp: prospectData.whatsapp,
    //     pdfBuffer: buffer,
    //     company: parsedPlan.company,
    //     plan: parsedPlan.plan,
    //     advisorName: advisor?.name,
    //     advisorEmail: advisor?.email ?? "emma@livestar.mx",
    //   });
    // } catch (pdfError) {
    //   console.error("Error generando o enviando PDF:", pdfError);
    // }

    // cookieStore.delete("prospect");
    // cookieStore.delete("selectedPlan");
    // cookieStore.delete("activePlanType");
    // cookieStore.delete("activePaymentType");

    cookies().set("selectedPlan", JSON.stringify(insuranceData));
    redirect("/cotizar/resumen");
  }
}

export async function setActivePlanType(formData: FormData) {
  const planTypeId = formData.get("planTypeId");
  cookies().set("planTypeId", planTypeId as string);
  revalidatePath("/");
}

export async function setActivePaymentType(formData: FormData) {
  const paymentType = formData.get("paymentType") as string;
  cookies().set("activePaymentType", paymentType);
  revalidatePath("/");
}

export const deleteSelectedPlan = () => {
  cookies().delete("selectedPlan");
  redirect("/cotizar/planes");
};

export const deleteProspectQuote = () => {
  cookies().delete("prospect");
  cookies().delete("selectedPlan");
  redirect("/cotizar");
};
