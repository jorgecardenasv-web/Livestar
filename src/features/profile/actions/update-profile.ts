"use server";

import { simplifyZodErrors } from "@/shared/utils";
import { updateProfileSchema } from "../schemas/update-profile";
import { updateProfileService } from "../services/update-profile.service";
import { getSession } from "@/lib/iron-session/get-session";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const updateProfile = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const session = await getSession();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const zodResult = updateProfileSchema.safeParse({
      name,
      email,
    });

    if (!zodResult.success) {
      const simplifiedErrors = simplifyZodErrors(zodResult.error);

      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    session.user.name = name;
    session.user.email = email;
    session.save();

    await updateProfileService({
      userId: session.user.id,
      name,
      email,
    });

    return {
      success: true,
      message: "Perfil actualizado correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al actualizar el perfil.",
    };
  }
};
