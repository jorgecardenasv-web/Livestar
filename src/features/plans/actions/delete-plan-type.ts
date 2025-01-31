"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { deletePlanTypeService } from "../services/delete/delete-plan-type.service";
import { PrismaError } from "@/shared/errors/prisma";

export const deletePlanType = async (
  planTypeId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await deletePlanTypeService(planTypeId);
    revalidatePath("/tipo-de-planes");
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
          : "Error al eliminar el tipo de plan.",
    };
  }
};
