import prisma from "@/lib/prisma";

export const createPlanService = async (payload: any) => {
  const { companyId, ...insurancePlanPayload } = payload;

  return prisma.$transaction(async (tx) => {
    const insurancePlan = await tx.plan.create({
      data: {
        ...insurancePlanPayload,
        companyId,
      },
    });
    return insurancePlan;
  });
};
