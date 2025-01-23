"use server";

import { FormState } from "@/shared/types";
import { updatePlanTypeService } from "../services/update-plan-type.service";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updatePlanTypeSchema } from "../schema/update-plan-type.schema";

export const updatePlanType = async (
  planTypeId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await updatePlanTypeService(planTypeId, Object.fromEntries(formData));

    revalidatePath("/planes/tipo-de-planes");

    return {
      message: "El tipo de plan se actualizado exitosamente",
      success: true,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Error desconocido",
      success: false,
    };
  }
};
