import prisma from "@/lib/prisma";

export const deletePlanService = (id: string) => {
  return prisma.plan.delete({
    where: {
      id,
    },
  });
};
