import prisma from "@/lib/prisma";
import { InsuranceCompany } from "@prisma/client";

export const deleteInsuranceService = (
  id: string
): Promise<InsuranceCompany> => {
  return prisma.insuranceCompany.delete({
    where: { id },
  });
};
