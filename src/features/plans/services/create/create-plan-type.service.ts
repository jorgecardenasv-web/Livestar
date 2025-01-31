import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

export const createPlanTypeService = async (
  formData: Prisma.PlanTypeCreateInput
) => {
  try {
    return await prisma.planType.create({
      data: formData,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
