"use server";
import { simplifyZodErrors } from "@/shared/utils";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { editAdvisorSchema } from "../schemas/edit-advisor";
import { updateAdvisorService } from "../services/update-advisor.service";
import { FormState } from "@/shared/types";

export const updateAdvisor = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const advisorId: string = formData.get("advisorId") as string;
    const email: string = formData.get("email") as string;
    const name: string = formData.get("name") as string;
    const status: string = formData.get("status") as string;

    const zodResult = editAdvisorSchema.safeParse({
      email,
      name,
    });

    if (!zodResult.success) {
      const simplifiedErrors = simplifyZodErrors(zodResult.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    const user: User | null = await updateAdvisorService(
      advisorId,
      email,
      name,
      status
    );

    if (!user) {
      return {
        success: false,
        message: "Error al editar al asesor.",
      };
    }

    revalidatePath("/asesores");
    return {
      success: true,
      message: "¡Asesor editado exitosamente!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
