"use server";

import { cookies } from "next/headers";

export async function getInsuranceState() {
  const cookieStore = cookies();
  const selectedPlanJson = cookieStore.get("selectedPlan")?.value;

  const parseAndFormatPlan = (json: string) => {
    const plan = JSON.parse(json);
    return {
      ...plan,
      sumInsured: Number(plan.sumInsured) ?? 0,
      deductible: Number(plan.deductible) ?? 0,
      coInsuranceCap: Number(plan.coInsuranceCap) ?? 0,
      coverage_fee: Number(plan.coverage_fee) ?? 0,
    };
  };

  const selectedPlan = selectedPlanJson
    ? parseAndFormatPlan(selectedPlanJson)
    : {};

  return {
    planTypeId: cookieStore.get("planTypeId")?.value,
    activePaymentType: cookieStore.get("activePaymentType")?.value || "Mensual",
    selectedPlan,
  };
}
