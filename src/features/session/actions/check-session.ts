"use server";

import { getSession } from "@/lib/iron-session/get-session";
import { checkSession } from "../services/verify-session.service";
import { handlePrismaError, PrismaError } from "@/shared/errors/prisma";

export const validateSession = async () => {
  try {
    const session = await getSession();

    const sessionDB = await checkSession(session.sessionId!);

    if (!sessionDB) {
      session.destroy();
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al validar la sesión.",
    };
  }
};
