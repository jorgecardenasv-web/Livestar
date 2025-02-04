"use server";

import { cookies } from "next/headers";
import { getProspectByIdService } from "@/features/prospects/services/get-prospect-by-id.service";
import { FormDataMedical } from "../types";
import { redirect } from "next/navigation";
import { PrismaError } from "@/shared/errors/prisma";
import { FormData } from "../schemas/form-schema";

// Nueva interfaz para tipar el payload recibido
export interface CreateMedicalHistoryPayload {
  forms: FormDataMedical[];
  prospectData: Partial<FormData>;
}

export const createMedicalHistory = async (
  payload: CreateMedicalHistoryPayload
) => {
  try {
    const { forms, prospectData } = payload;
    const cookieStore = cookies();
    const prospectJson = cookieStore.get("prospect")?.value;
    const prospect = prospectJson ? JSON.parse(prospectJson) : {};

    console.log({
      formMedical: forms[0].healthConditions,
      prospectData,
    });

    // if (prospectData) {
    //   await createMedicalHistoryService(formMedical, prospectData?.id);

    //   cookieStore.delete("prospect");
    //   cookieStore.delete("selectedPlan");
    //   cookieStore.delete("activePlanType");
    //   cookieStore.delete("activePaymentType");
    // }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear el historial médico.",
    };
  }
  // redirect("/cotizar");
};
