"use server";

import { z } from "zod";
import { simplifyZodErrors } from "@/shared/utils";
import { changeAdvisorService } from "../services/change-advisor.service";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

const ChangeAdvisorSchema = z.object({
  advisorId: z.string(),
});

export const changeStatusAndAdvisor = async (
  prospectId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const advisorId = formData.get("userId") as string;

    if (!prospectId) {
      return {
        success: false,
        message: "Es necesario mandar el id del prospecto.",
      };
    }

    const { data, success, error } = ChangeAdvisorSchema.safeParse({
      advisorId,
    });

    if (!success) {
      const simplifiedErrors = simplifyZodErrors(error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    const prospect = await changeAdvisorService({
      prospectId,
      advisorId: data.advisorId,
    });

    if (!prospect) {
      return {
        success: false,
        message: "No se pudo actualizar el prospecto.",
      };
    }

    revalidatePath("/prospects");

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
