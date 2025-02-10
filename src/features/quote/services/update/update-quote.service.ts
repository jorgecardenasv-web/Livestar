import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

interface UpdateQuoteService {
  quote: { id: string } & Omit<Prisma.QuoteUpdateInput, "id">;
  prospect: Prisma.ProspectUpdateInput;
}

export const updateQuoteService = async ({
  quote: { id, ...quote },
  prospect,
}: UpdateQuoteService) => {
  try {
    return await prisma.quote.update({
      where: { id },
      data: {
        ...quote,
        prospect: {
          update: prospect,
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
