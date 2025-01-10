import prisma from "@/lib/prisma";
import { Insurance } from "@prisma/client";

export const createInsuranceService = async ({
  name,
  logo,
}: Pick<Insurance, "logo" | "name">): Promise<Insurance> => {
  return await prisma.insurance.create({
    data: {
      name,
      logo,
    },
  });
};
