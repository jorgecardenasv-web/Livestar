import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const reassignQuoteService = async (advisorId: string) => {
  try {
    const quotesToReassign = await prisma.quote.findMany({
      select: {
        id: true,
      },
      where: {
        userId: advisorId,
      },
    });

    for (const quote of quotesToReassign) {
      const nextAdvisor = await getAdvisorWithLeastProspectsService();
      if (nextAdvisor) {
        await prisma.quote.update({
          where: { id: quote.id },
          data: {
            userId: nextAdvisor?.id,
          },
        });

        await prisma.user.update({
          where: { id: nextAdvisor.id },
          data: {
            lastProspectAssigned: new Date(),
            isNewAdvisor: false,
          },
        });
      } else {
        await prisma.quote.update({
          where: { id: quote.id },
          data: {
            userId: null,
          },
        });
      }
    }
  } catch (error) {
    throw handlePrismaError(error);
  }
};
