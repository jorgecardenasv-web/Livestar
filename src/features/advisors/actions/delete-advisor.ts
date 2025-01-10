"use server";
import { reassignProspectService } from "@/features/insurance-quote/services/reassign-prospect.service";
import prisma from "@/lib/prisma";
import { prefix } from "@/shared/utils/constants";
import { revalidatePath } from "next/cache";

export const deleteAdvisor = async (advisorId: string): Promise<boolean> => {
  try {
    await prisma.$transaction(async (prisma) => {
      await reassignProspectService(advisorId);

      await prisma.user.delete({
        where: { id: advisorId },
      });
    });
    revalidatePath(`${prefix}/asesores`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
