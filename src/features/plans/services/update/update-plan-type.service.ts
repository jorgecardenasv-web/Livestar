import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

export const updatePlanTypeService = async (
  planTypeId: string,
  formData: Prisma.PlanTypeUpdateInput
) => {
  try {
    return await prisma.planType.update({
      where: {
        id: planTypeId,
      },
      data: formData,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
