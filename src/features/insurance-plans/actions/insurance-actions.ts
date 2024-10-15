"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  };

  cookies().set("selectedPlan", JSON.stringify(insuranceData));
  redirect("/resumen-de-cotizacion");
}

export async function setActivePlanType(formData: FormData) {
  const planType = formData.get("planType") as string;
  cookies().set("activePlanType", planType);
}

export async function setActivePaymentType(formData: FormData) {
  const paymentType = formData.get("paymentType") as string;
  cookies().set("activePaymentType", paymentType);
}

export async function getInsuranceState() {
  const cookieStore = cookies();
  const selectedPlanJson = cookieStore.get("selectedPlan")?.value;
  const selectedPlan = selectedPlanJson ? JSON.parse(selectedPlanJson) : {};

  return {
    activePlanType: cookieStore.get("activePlanType")?.value || "Esencial",
    activePaymentType: cookieStore.get("activePaymentType")?.value || "Mensual",
    selectedPlan,
  };
}
