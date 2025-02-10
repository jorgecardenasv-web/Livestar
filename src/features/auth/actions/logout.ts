"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/iron-session/get-session";
import { deleteSessionService } from "@/features/session/services/delete-session.service";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const logout = async (): Promise<FormState> => {
  const session = await getSession();
  try {
    if (session) {
      await deleteSessionService(session.sessionId!);
    }

    session.destroy();
  } catch (error) {
    session.destroy();
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al cerrar sesión.",
    };
  }
  redirect("/ini-ses-adm");
};
