import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Insurance } from "@generated/prisma/client";

export const deleteInsuranceService = async (
  id: string
): Promise<Insurance> => {
  try {
    return await prisma.insurance.delete({
      where: { id },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
