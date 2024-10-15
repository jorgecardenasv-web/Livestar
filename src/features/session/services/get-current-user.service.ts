import prisma from "@/lib/prisma";

export const getCurrentUserService = async (userId: string) => {
  return prisma.user.findFirst({
    where: {
      uuid: userId,
    },
  });
};