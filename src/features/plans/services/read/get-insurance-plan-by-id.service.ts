import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getInsurancePlanByIdService = async (id: string) => {
  try {
    return await prisma.plan.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        planType: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
