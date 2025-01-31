"use server";

import { revalidatePath } from "next/cache";
import { deleteSessionService } from "../services/delete-session.service";
import { prefix } from "@/shared/utils/constants";
import { PrismaError } from "@/shared/errors/prisma";

export const invalidateSession = async (sessionId: string) => {
  try {
    await deleteSessionService(sessionId);
    revalidatePath(`${prefix}/sesiones`);
    return true;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al eliminar la sesión.",
    };
  }
};
