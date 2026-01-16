import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { QuoteStatus } from "@generated/prisma/client";

export const changeAdvisorService = async (
  prospectId: string,
  data: {
    userId: string;
    status: QuoteStatus;
  }
) => {
  try {
    return await prisma.quote.update({
      where: {
        id: prospectId,
      },
      data,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
