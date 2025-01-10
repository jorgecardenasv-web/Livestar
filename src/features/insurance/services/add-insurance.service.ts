import prisma from "@/lib/prisma";
import { Insurance } from "@prisma/client";

export const addInsuranceService = async ({
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
