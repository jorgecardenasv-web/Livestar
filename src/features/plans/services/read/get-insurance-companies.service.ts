import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getInsuranceCompaniesService = async () => {
  try {
    return await prisma.insurance.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
