import prisma from "@/lib/prisma";

export const getInsuranceCompaniesService = () => {
  return prisma.insuranceCompany.findMany({
    select: {
      name: true,
      id: true,
    },
  });
};
