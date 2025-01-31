import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const deleteSessionService = async (sessionId: string) => {
  try {
    return await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
