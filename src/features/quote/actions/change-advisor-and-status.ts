"use server";

import { z } from "zod";
import { simplifyZodErrors } from "@/shared/utils";
import { changeAdvisorService } from "../services/update/change-advisor.service";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";
import { QuoteStatus } from "@generated/prisma/client";

const ChangeAdvisorSchema = z.object({
  userId: z.string(),
  status: z.nativeEnum(QuoteStatus),
});

export const changeStatusAndAdvisor = async (
  prospectId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);

    if (!prospectId) {
      return {
        success: false,
        message: "Es necesario mandar el id del prospecto.",
      };
    }

    const { data, success, error } = ChangeAdvisorSchema.safeParse(rawFormData);

    if (!success) {
      const simplifiedErrors = simplifyZodErrors(error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    await changeAdvisorService(prospectId, data);

    revalidatePath("/cotizaciones");

    return {
      success: true,
      message: "Prospecto actualizado correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar el prospecto.",
    };
  }
};
