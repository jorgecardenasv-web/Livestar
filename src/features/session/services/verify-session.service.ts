import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const checkSession = async (sessionId: string) => {
  try {
    return await prisma.session.findUnique({
      where: { id: sessionId },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
