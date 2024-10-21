"use server";

import { getInsuranceState } from "@/features/insurance-plans/actions/insurance-actions";
import { cookies } from "next/headers";
import {
  createQuoteService,
  getPlanByUuid,
} from "../services/create-quote.service";
import { createTrackingNumberService } from "../services/create-traking.service";
import { getProspectByIdService } from "@/features/prospects/services/get-prospect-by-id.service";
import { redirect } from "next/navigation";

export async function handleContractNow() {
  const { selectedPlan } = await getInsuranceState();
  const cookieStore = cookies();

  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};
  console.log("prospecto", prospect);
  console.log("plan", selectedPlan);

  if (!prospect.id || !selectedPlan.id) {
    console.error("Datos insuficientes para crear el quote.");
    return;
  }
  const prospectData = await getProspectByIdService(prospect.id);
  const planData = await getPlanByUuid(selectedPlan.id);
  console.log(prospectData);
  if (prospectData && planData) {
    const quoteData = {
      prospectId: prospectData.id,
      planId: planData.id,
      customizations: null,
      totalPrice: parseFloat(selectedPlan.coverage_fee),
      expirationDate: new Date(),
    };

    const quote = await createQuoteService(quoteData);

    await createTrackingNumberService({ quoteId: quote.id });

    console.log("Quote y Tracking Number creados con éxito");
    redirect("/finalizar-cotizacion");
  }
}
