import prisma from "@/lib/prisma";
import { InsuranceCompany } from "@prisma/client";

export const addInsuranceService = async ({
  name,
  logo,
}: Pick<InsuranceCompany, "logo" | "name">): Promise<InsuranceCompany> => {
  return await prisma.insuranceCompany.create({
    data: {
      name,
      logo,
    },
  });
};
