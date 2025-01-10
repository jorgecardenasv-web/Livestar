"use server";
import { reassignProspectService } from "@/features/insurance-quote/services/reassign-prospect.service";
import prisma from "@/lib/prisma";
import { FormState } from "@/shared/types";
import { prefix } from "@/shared/utils/constants";
import { revalidatePath } from "next/cache";

export const deleteAdvisor = async (advisorId: string): Promise<FormState> => {
  try {
    await prisma.$transaction(async (prisma) => {
      await reassignProspectService(advisorId);

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
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
