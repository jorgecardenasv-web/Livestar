import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { Prisma } from "@prisma/client";

interface UpdateQuoteService {
  quote: { id: string } & Omit<Prisma.QuoteUpdateInput, "id">;
  prospect: Prisma.ProspectUpdateInput;
  medicalHistory?: Prisma.MedicalHistoryUpdateInput;
}

export const updateQuoteService = async ({
  quote: { id: quoteId, protectWho, ...quoteData },
  prospect,
  medicalHistory,
}: UpdateQuoteService) => {
  try {
    return await prisma.quote.update({
      where: {
        id: quoteId,
      },
      data: {
        protectWho,
        additionalInfo: { ...quoteData } as any,
        prospect: {
          update: prospect,
        },
        medicalHistories: medicalHistory
          ? {
              update: {
                where: { id: quoteId },
                data: medicalHistory,
              },
            }
          : undefined,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
