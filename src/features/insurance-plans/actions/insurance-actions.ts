"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleInterestClick(formData: FormData) {
  const insuranceData = {
    company: formData.get("company"),
    companyLogo: formData.get("companyLogo"),
    plan: formData.get("plan"),
    paymentType: formData.get("paymentType"),
    sumInsured: formData.get("sumInsured"),
    deductible: formData.get("deductible"),
    coInsurance: formData.get("coInsurance"),
    coInsuranceCap: formData.get("coInsuranceCap"),
    coverage_fee: formData.get("coverage_fee"),
    id: formData.get("id"),
  };

  cookies().set("selectedPlan", JSON.stringify(insuranceData));
  revalidatePath("/cotizar");
}

export async function setActivePlanType(formData: FormData) {
  const planType = formData.get("planType") as string;
  cookies().set("activePlanType", planType);
}

export async function setActivePaymentType(formData: FormData) {
  const paymentType = formData.get("paymentType") as string;
  cookies().set("activePaymentType", paymentType);
}

export async function getProspect() {
  const cookieStore = cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};
  return prospect;
}

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

export const deleteSelectedPlan = () => {
  cookies().delete("selectedPlan");
  revalidatePath("/cotizar");
};
