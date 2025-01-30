import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const updatePlanService = async (data: any, planId: string) => {

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
  } catch (err) {
    console.error("Error al actualizar el plan:", err);

    return {
      success: false,
      message: "Error al actualizar el plan",
      error:
        err instanceof Prisma.PrismaClientKnownRequestError
          ? err.message
          : "Unexpected error",
    };
  }
};
