"use server";

import { FormState } from "@/shared/types";
import { updatePlanTypeService } from "../services/update/update-plan-type.service";
import { revalidatePath } from "next/cache";
import { PrismaError } from "@/shared/errors/prisma";

export const updatePlanType = async (
  planTypeId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await updatePlanTypeService(planTypeId, Object.fromEntries(formData));

    revalidatePath("/planes/tipo-de-planes");

    return {
      message: "El tipo de plan se actualizado exitosamente.",
      success: true,
    };
  } catch (error) {
    console.log("Error al actualizar el tipo de plan:", error);

    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar el tipo de plan.",
    };
  }
};
