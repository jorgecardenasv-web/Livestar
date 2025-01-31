import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const createSessionService = async (userId: string) => {
  try {
    return await prisma.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
