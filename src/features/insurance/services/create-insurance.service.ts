import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Insurance } from "@prisma/client";

export const createInsuranceService = async ({
  name,
  logo,
}: Pick<Insurance, "logo" | "name">): Promise<Insurance> => {
  try {
    return await prisma.insurance.create({
      data: {
        name,
        logo,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
