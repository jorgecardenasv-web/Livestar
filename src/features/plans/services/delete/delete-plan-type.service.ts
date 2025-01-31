import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const deletePlanTypeService = async (id: string) => {
  try {
    return await prisma.planType.delete({
      where: { id },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
