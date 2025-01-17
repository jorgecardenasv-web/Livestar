import prisma from "@/lib/prisma";

export const createHospitalLevels = async (payload: any) => {
  const { hospitalLevel, planId } = payload;

  return prisma.$transaction(async (tx) => {
    const deductible = await tx.deductible.create({
      data: {
        planId,
        hospitalLevel: hospitalLevel.level,
        amount: parseFloat(hospitalLevel.amount),
        option: hospitalLevel.option,
      },
    });
    return deductible;
  });
};
