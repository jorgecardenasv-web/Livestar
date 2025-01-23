import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createPlanService = async (data: any) => {
  console.log(data);

  try {
    const newPlan = await prisma.plan.create({
      data,
    });

    return newPlan;
  } catch (error) {
    console.log({ error });

    return error;
  }
};
