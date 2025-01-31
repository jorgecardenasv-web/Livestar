import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getSessionsService = async ({
  currentSessionId,
}: {
  currentSessionId: string;
}) => {
  try {
    return await prisma.session.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        active: true,
        NOT: {
          id: currentSessionId,
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
