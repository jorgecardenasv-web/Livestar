"use server";

import { revalidatePath } from "next/cache";
import { deletePlanService } from "../services/delete/delete-plan.service";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const deletePlan = async (
  planId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await deletePlanService(planId);

    revalidatePath("/planes");

    return {
      success: true,
      message: "Plan eliminado correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al eliminar el plan.",
    };
  }
};
