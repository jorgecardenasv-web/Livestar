import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createPlanService = async (data: any) => {
  try {
    const newPlan = await prisma.plan.create({
      data,
    });

    return newPlan;
  } catch (error) {
    return error;
  }
};
