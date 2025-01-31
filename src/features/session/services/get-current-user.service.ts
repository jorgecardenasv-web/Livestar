import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getCurrentUserService = async (userId: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
