import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Quote } from "../../types";

export const getQuoteByIdService = async (
  quoteId: string
): Promise<Quote | null> => {
  try {
    return await prisma.quote.findUnique({
      where: {
        id: quoteId,
      },
      include: {
        prospect: true,
        user: true,
        plan: {
          include: {
            company: true,
            planType: true,
          },
        },
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
