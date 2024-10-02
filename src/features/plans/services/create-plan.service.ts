import prisma from "@/lib/prisma";
import { InsurancePlan } from "@prisma/client";

export const createPlanService = (plan: InsurancePlan): Promise<InsurancePlan> => {
  return prisma.insurancePlan.create({
    data: plan,
  });
};