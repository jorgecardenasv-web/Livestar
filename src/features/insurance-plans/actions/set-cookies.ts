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
    isMultipleString: formData.get("isMultipleString"),
    deductiblesJson: formData.get("deductiblesJson")
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


export const deleteSelectedPlan = () => {
  cookies().delete("selectedPlan");
  revalidatePath("/cotizar");
};
