"use server"

import { cookies } from "next/headers";

export async function getInsuranceState() {
  const cookieStore = cookies();
  const selectedPlanJson = cookieStore.get("selectedPlan")?.value;

  const formatNumber = (value: string) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      Number(value.replace(/,/g, ""))
    );

  const parseAndFormatPlan = (json: string) => {
    const plan = JSON.parse(json);
    return {
      ...plan,
      sumInsured: formatNumber(plan.sumInsured || "0"),
      deductible: formatNumber(plan.deductible || "0"),
      coInsuranceCap: formatNumber(plan.coInsuranceCap || "0"),
      coverage_fee: formatNumber(plan.coverage_fee || "0"),
    };
  };

  const selectedPlan = selectedPlanJson
    ? parseAndFormatPlan(selectedPlanJson)
    : {};

  return {
    activePlanType: cookieStore.get("activePlanType")?.value || "Esencial",
    activePaymentType: cookieStore.get("activePaymentType")?.value || "Mensual",
    selectedPlan,
  };
}