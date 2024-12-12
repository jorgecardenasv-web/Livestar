"use server";

import { updatePasswordSchema } from "../schemas/update-password";
import { simplifyZodErrors } from "@/shared/utils";
import { compare, hash } from "bcrypt";
import { AuthService } from "@/shared/services/find-user.service";
import { getSession } from "@/lib/iron-session/get-session";
import { updatePasswordService } from "../services/index.services";

export const updatePassword = async (prevState: any, formData: FormData) => {
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
      errors: simplifiedErrors,
    };
  }

  const user = await AuthService.findUserById(session.user.id);

  if (!user) {
    return {
      error: "El usuario no existe.",
    };
  }

  const isValid = await compare(currentPassword, user.password);

  if (!isValid) {
    return {
      error: "La contraseña actual es incorrecta.",
    };
  }

  const newHashedPassword = await hash(newPassword, 10);

  const result = await updatePasswordService({
    userId: session.user.id,
    password: newHashedPassword,
  });

  return { result };
};
