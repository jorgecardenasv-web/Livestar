import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const deletePlanService = async (id: string) => {
  try {
    return await prisma.plan.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
