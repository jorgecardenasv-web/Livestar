import prisma from "@/lib/prisma";

export const getInsurancePlanByIdService = async (id: string) => {
  return prisma.insurancePlan.findUnique({
    where: {
      id,
    },
  });
};