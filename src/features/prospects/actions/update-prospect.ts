"use server";

import { prefix } from "@/shared/utils/constants";
import { revalidatePath } from "next/cache";
import { updateProspectService } from "../services/update-prospect.service";
import { parsedFormDataAge } from "@/shared/utils";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const updateProspect = async (
  prospectId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const rawFormData = Object.fromEntries(formData);

    const parsedFormData = parsedFormDataAge(rawFormData);

    await updateProspectService(prospectId, parsedFormData);

    revalidatePath(`${prefix}/prospectos/${prospectId}`);

    return {
      success: true,
      message: "Cotización actualizada correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar la cotización.",
    };
  }
};
