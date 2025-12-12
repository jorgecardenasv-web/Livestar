import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAllProspectsByDateService = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    return await prisma.quote.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: true,
        prospect: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
