"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/iron-session/get-session";
import { deleteSessionService } from "@/features/session/services/delete-session.service";
import { FormState } from "@/shared/types";
import { PrismaError } from "@/shared/errors/prisma";

export const logout = async (): Promise<FormState> => {
  try {
    const session = await getSession();

    if (session) {
      await deleteSessionService(session.sessionId!);
    }
    redirect("/ini-ses-adm");
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al cerrar sesión.",
    };
  }
};
