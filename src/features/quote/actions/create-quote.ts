"use server";

import { getProspectByIdService } from "@/features/prospects/services/get-prospect-by-id.service";
import { FormDataMedical } from "../types";
import { redirect } from "next/navigation";
import { PrismaError } from "@/shared/errors/prisma";
import { FormData } from "../schemas/form-schema";
import { cookies } from "next/headers";
import { createQuoteService } from "../services/create/create-quote.service";

export const createQuoteAction = async (payload: any) => {
  try {
    const { prospectData, medicalData } = payload;
    const cookieStore = cookies();

    const selectedPlan = cookieStore.get("selectedPlan")?.value;

    if (prospectData) {
      await createQuoteService({
        prospectData,
        medicalData,
        plan: JSON.parse(selectedPlan!),
      });

      cookieStore.delete("prospect");
      cookieStore.delete("selectedPlan");
      cookieStore.delete("activePlanType");
      cookieStore.delete("activePaymentType");
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear el historial médico.",
    };
  }
  redirect("/cotizar");
};
