import prisma from "@/lib/prisma";

export const getTotalPlansService = async (): Promise<number> => {
  return await prisma.plan.count();
};
