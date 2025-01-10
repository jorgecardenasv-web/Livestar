"use server";

import { loginSchema } from "../schemas/login";
import { verifyCredentialsService } from "../services/verify-credentials.service";
import { getSession } from "@/lib/iron-session/get-session";
import { createSessionService } from "@/features/session/services/create-session.service";
import { simplifyZodErrors } from "@/shared/utils";
import { FormState } from "@/shared/types";

export const login = async (
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const session = await getSession();

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const simplifiedErrors = simplifyZodErrors(result.error);
      return {
        success: false,
        message: "",
        inputErrors: simplifiedErrors,
      };
    }

    const user = await verifyCredentialsService(email, password);

    if (!user) {
      return {
        success: false,
        message: "Error en las credenciales.",
      };
    }

    const sessionDB = await createSessionService(user.id);

    if (!sessionDB) {
      return {
        success: false,
        message: "Internal server error.",
      };
    }

    session.isLoggedIn = true;
    session.user = user;
    session.sessionId = sessionDB.id;

    await session.save();

    return {
      success: true,
      message: "¡Sesión iniciada exitosamente!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error en la autenticación.",
    };
  }
};
