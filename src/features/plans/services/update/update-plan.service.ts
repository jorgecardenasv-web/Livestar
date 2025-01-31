import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

export const updatePlanService = async (
  data: Prisma.PlanUncheckedCreateInput,
  planId: string
) => {
  try {
    const { companyId, planTypeId, ...updateData } = data;

    const updatedPlan = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        ...updateData,
        company: {
          connect: {
            id: companyId,
          },
        },
        planType: {
          connect: {
            id: planTypeId,
          },
        },
      },
    });

    return {
      success: true,
      message: "Plan actualizado exitosamente",
      updatedPlan,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
