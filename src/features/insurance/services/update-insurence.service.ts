import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Insurance } from "@prisma/client";

export const updateInsuranceService = async (
  id: string,
  data: Partial<Pick<Insurance, "logo" | "name">>
): Promise<Insurance> => {
  try {
    return await prisma.insurance.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
