import prisma from "@/lib/prisma";

export const createPlanService = async (payload: any) => {
  const { companyId, ...insurancePlanPayload } = payload;

  return prisma.$transaction(async (tx) => {
    const company = await tx.insuranceCompany.findUnique({
      where: {
        id: companyId,
      },
    });

    const insurancePlan = await tx.insurancePlan.create({
      data: {
        ...insurancePlanPayload,
        companyId: company?.id,
      },
    });

    return insurancePlan;
  });
};
