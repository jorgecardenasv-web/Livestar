"use server";

import { FormState } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { createPlanTypeService } from "../services/create/create-plan-type.service";
import { createPlanTypeSchema } from "../schema/create-plan-type.schema";
import { simplifyZodErrors } from "@/shared/utils";
import { PrismaError } from "@/shared/errors/prisma";

export const createPlanType = async (
  id: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);

    const { data, success, error } =
      createPlanTypeSchema.safeParse(rawFormData);

    if (!success) {
      return {
        success: false,
        message: "",
        inputErrors: simplifyZodErrors(error),
      };
    }

    await createPlanTypeService(data);

    revalidatePath("/planes/tipo-de-planes");

    return {
      message: "El tipo de plan se actualizado exitosamente.",
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar el tipo de plan.",
    };
  }
};
