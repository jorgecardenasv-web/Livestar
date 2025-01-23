import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createHospitalLevels = async (
  data: Prisma.DeductibleCreateManyInput[]
) => {
  return prisma.deductible.createMany({
    data,
  });
};
