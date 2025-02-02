"use server";

import { loginSchema } from "../schemas/login";
import { verifyCredentialsService } from "../services/verify-credentials.service";
import { getSession } from "@/lib/iron-session/get-session";
import { createSessionService } from "@/features/session/services/create-session.service";
import { simplifyZodErrors } from "@/shared/utils";
import { FormState } from "@/shared/types";
import { redirect } from "next/navigation";
import { prefix } from "@/features/layout/nav-config/constants";
import { PrismaError } from "@/shared/errors/prisma";

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
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al iniciar sesión.",
    };
  }
  redirect(`${prefix}/cotizaciones`);
};
