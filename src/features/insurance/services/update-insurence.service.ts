import prisma from "@/lib/prisma";
import { Insurance } from "@prisma/client";

export const updateInsuranceService = async (
  id: string,
  data: Partial<Pick<Insurance, "logo" | "name">>
): Promise<Insurance> => {
  return await prisma.insurance.update({
    where: { id },
    data,
  });
};
