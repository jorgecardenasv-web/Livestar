"use server";

import { FormState } from "@/shared/types";
import { editPlanTypeService } from "../services/update-plan-type.service";
import { revalidatePath } from "next/cache";

export const updatePlanType = async (
  planTypeId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await editPlanTypeService(planTypeId, Object.fromEntries(formData));

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
