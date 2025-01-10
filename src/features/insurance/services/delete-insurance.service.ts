import prisma from "@/lib/prisma";
import { Insurance } from "@prisma/client";

export const deleteInsuranceService = (
  id: string
): Promise<Insurance> => {
  return prisma.insurance.delete({
    where: { id },
  });
};
