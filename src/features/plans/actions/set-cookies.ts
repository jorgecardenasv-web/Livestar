"use server";

import { revalidatePath } from "next/cache";
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
    individualPricesJson: formData.get("individualPricesJson"),
    id: formData.get("id"),
    isMultipleString: formData.get("isMultipleString"),
    deductiblesJson: formData.get("deductiblesJson"),
    isMultipleCoInsurance: formData.get("isMultipleCoInsurance"),
    coInsuranceJson: formData.get("coInsuranceJson"),
    coInsuranceCapJson: formData.get("coInsuranceCapJson"),
    protectedWho: formData.get("protectedWho"),
  };

  cookies().set("selectedPlan", JSON.stringify(insuranceData));
  redirect("/cotizar/resumen");
}

export async function setActivePlanType(formData: FormData) {
  const planTypeId = formData.get("planTypeId");
  cookies().set("planTypeId", planTypeId as string);
}

export async function setActivePaymentType(formData: FormData) {
  const paymentType = formData.get("paymentType") as string;
  cookies().set("activePaymentType", paymentType);
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
