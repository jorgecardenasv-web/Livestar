import prisma from "@/lib/prisma";

export const getInsuranceCompaniesService = () => {
  return prisma.insurance.findMany({
    select: {
      name: true,
      id: true,
    },
  });
};
