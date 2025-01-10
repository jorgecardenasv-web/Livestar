import prisma from "@/lib/prisma";

export const getInsurancePlanByIdService = async (id: string) => {
  return prisma.plan.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
      planType: true,
    },
  });
};
