"use server";

import { prefix } from "@/shared/utils/constants";
import { createPlanService } from "../services/create-plan.service";
import { redirect } from "next/navigation";
import { flatPricesToJsonPrices } from "../utils";

export const createPlan = async (formData: FormData) => {
  const name = formData.get("name");
  const companyId = formData.get("companyId");
  const sumInsured = formData.get("sumInsured");
  const coInsurance = formData.get("coInsurance");
  const coInsuranceCap = formData.get("coInsuranceCap");
  const prices = formData.get("prices");

  const rawFormData = {
    name,
    companyId,
    sumInsured: Number(sumInsured),
    coInsurance: Number(coInsurance),
    coInsuranceCap: Number(coInsuranceCap),
    prices: prices ? flatPricesToJsonPrices(JSON.parse(prices as string)) : {},
  };

  await createPlanService(rawFormData);

  redirect(`${prefix}/planes`);
};
