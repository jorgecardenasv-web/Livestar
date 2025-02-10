"use server";

import { redirect } from "next/navigation";
import { PrismaError } from "@/shared/errors/prisma";
import { cookies } from "next/headers";
import { createQuoteService } from "../services/create/create-quote.service";
import { getAdvisorWithLeastQuotesService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";

export const createQuoteAction = async (payload: any) => {
  try {
    const { prospectData, medicalData } = payload;
    const cookieStore = cookies();

    const selectedPlan = cookieStore.get("selectedPlan")?.value;

    const advisor = await getAdvisorWithLeastQuotesService();

    if (prospectData) {
      await createQuoteService(
        {
          prospectData,
          medicalData,
          plan: JSON.parse(selectedPlan!),
        },
        advisor?.id!
      );

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
