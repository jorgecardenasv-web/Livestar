"use server";

import { simplifyZodErrors } from "@/shared/utils";
import { addAdvisorSchema } from "../schemas/add-advisor";
import type { User } from "@generated/prisma/client";
import { revalidatePath } from "next/cache";
import { FormState } from "@/shared/types";
import { createAdvisorService } from "../services/add-advisor.service";
import { PrismaError } from "@/shared/errors/prisma";

export const createAdvisor = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const name: string = formData.get("name") as string;
    const passwordConfirmation: string = formData.get(
      "password-confirmation"
    ) as string;

    if (password !== passwordConfirmation) {
      return {
        success: false,
        message: "",
        inputErrors: {
          password: "Las contraseñas no coinciden.",
          passwordConfirmation: "Las contraseñas no coinciden.",
        },
      };
    }

    const zodResult = addAdvisorSchema.safeParse({
      email,
      password,
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

    const user: User | null = await createAdvisorService(email, password, name);

    if (!user) {
      return {
        success: false,
        message: "Error al crear el asesor.",
      };
    }

    revalidatePath("/asesores");
    return {
      success: true,
      message: "¡Asesor creado exitosamente!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al crear el asesor.",
    };
  }
};
