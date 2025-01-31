"use server";

import { updatePasswordSchema } from "../schemas/update-password";
import { simplifyZodErrors } from "@/shared/utils";
import { compare, hash } from "bcrypt";
import { AuthService } from "@/shared/services/find-user.service";
import { getSession } from "@/lib/iron-session/get-session";
import { updatePasswordService } from "../services/update-password.service";
import { PrismaError } from "@/shared/errors/prisma";
import { FormState } from "@/shared/types";

export const updatePassword = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const session = await getSession();

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const zodResult = updatePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!zodResult.success) {
      const simplifiedErrors = simplifyZodErrors(zodResult.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    const user = await AuthService.findUserById(session.user.id);

    if (!user) {
      return {
        success: false,
        message: "El usuario no existe.",
      };
    }

    const isValid = await compare(currentPassword, user.password);

    if (!isValid) {
      return {
        success: false,
        message: "La contraseña actual es incorrecta.",
      };
    }

    const newHashedPassword = await hash(newPassword, 10);

    await updatePasswordService({
      userId: session.user.id,
      password: newHashedPassword,
    });

    return {
      success: true,
      message: "Contraseña actualizada correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar la contraseña.",
    };
  }
};
