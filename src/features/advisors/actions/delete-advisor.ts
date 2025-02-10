"use server";

import { reassignQuoteService } from "@/features/quote/services/update/reassign-quote.service";
import prisma from "@/lib/prisma";
import { PrismaError } from "@/shared/errors/prisma";
import { FormState } from "@/shared/types";
import { prefix } from "@/features/layout/nav-config/constants";
import { revalidatePath } from "next/cache";

export const deleteAdvisor = async (
  advisorId: string,
  prevState: any,
  formData: FormData
): Promise<FormState> => {
  try {
    await prisma.$transaction(async (prisma) => {
      await reassignQuoteService(advisorId);

      await prisma.user.delete({
        where: { id: advisorId },
      });
    });

    revalidatePath(`${prefix}/asesores`);

    return {
      success: true,
      message: "¡Asesor borrado exitosamente!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof PrismaError
          ? error.message
          : "Error al eliminar el asesor.",
    };
  }
};
