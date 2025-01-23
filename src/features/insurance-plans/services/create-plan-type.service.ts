import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createPlanTypeService = (formData: Prisma.PlanTypeCreateInput) => {
  return prisma.planType.create({
    data: formData,
  });
};
