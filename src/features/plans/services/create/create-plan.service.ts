import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@generated/prisma/client";

export const createPlanService = async (
  data: Prisma.PlanUncheckedCreateInput
) => {
  try {
    return await prisma.plan.create({
      data,
    });
  } catch (error) {
    return handlePrismaError(error);
  }
};
