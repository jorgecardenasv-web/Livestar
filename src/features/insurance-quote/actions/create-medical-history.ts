"use server";

import { createMedicalHistoryService } from "../services/create-medical-history.service";
import { cookies } from "next/headers";
import { getProspectByIdService } from "@/features/prospects/services/get-prospect-by-id.service";
import { FormDataMedical } from "../types";
import { redirect } from "next/navigation";

export const createMedicalHistory = async (formMedical: FormDataMedical[]) => {
  const cookieStore = cookies();
  const prospectJson = cookieStore.get("prospect")?.value;
  const prospect = prospectJson ? JSON.parse(prospectJson) : {};
  const prospectData = await getProspectByIdService(prospect.id);

  if (prospectData) {
    await createMedicalHistoryService(formMedical, prospectData?.id);

    cookieStore.delete("prospect");
    cookieStore.delete("selectedPlan");
    cookieStore.delete("activePlanType");
    cookieStore.delete("activePaymentType");
    redirect("/cotizar");
  }
};
