"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { createProspectService } from "@/features/quote/services/create-prospect.service";
import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import {
  createQuoteService,
  getPlanByUuid,
} from "../services/create-quote.service";
import { createTrackingNumberService } from "../services/create-traking.service";
import { PrismaError } from "@/shared/errors/prisma";

export async function handleContractNow() {
  try {
    const { selectedPlan } = await getInsuranceState();
    const cookieStore = cookies();

    const prospectJson = cookieStore.get("prospect")?.value;
    const prospect = prospectJson ? JSON.parse(prospectJson) : {};

    const advisor = await getAdvisorWithLeastProspectsService();
    if (!advisor) throw new Error("No advisor available");

    const newProspect = await createProspectService(prospect, advisor.id);
    const planData = await getPlanByUuid(selectedPlan.id);

    if (!planData || !newProspect) {
      throw new Error("Failed to create prospect or get plan data");
    }

    const newCookieProspect = {
      ...prospect,
      id: newProspect.id,
    };

    cookies().set("prospect", JSON.stringify(newCookieProspect));

    const quoteData = {
      prospectId: newProspect.id,
      planId: planData.id,
      totalPrice: parseFloat(selectedPlan.coverage_fee),
      expirationDate: new Date(),
    };

    const quote = await createQuoteService(quoteData);
    await createTrackingNumberService({ quoteId: quote.id });

    // await sendProspectEmail({
    //   prospectName: prospect.name,
    //   insuranceName: planData.company.name,
    //   planName: planData.planType.name,
    //   quotes: [quote],
    //   totalPrice: parseFloat(selectedPlan.coverage_fee),
    //   contactNumber: process.env.CONTACT_NUMBER!,
    //   logoUrl: planData.company.logo,
    //   prospectEmail: prospect.email
    // });

    // await sendAdvisorEmail({
    //   advisorName: advisor.name,
    //   prospectName: prospect.name,
    //   prospectEmail: "ulises.vargas@yocontigo-it.com",
    //   selectedPlan: `${planData.company.name} - ${planData.planType.name}`,
    //   emailAdvisor: advisor.email
    // });

    redirect("/finalizar-cotizacion");
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear la cotización.",
    };
  }
}
