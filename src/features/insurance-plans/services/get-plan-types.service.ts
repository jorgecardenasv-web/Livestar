import prisma from "@/lib/prisma";

export const getPlanTypesSirvice = () => {
  return prisma.planType.findMany();
};
