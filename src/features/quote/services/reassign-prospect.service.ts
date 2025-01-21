import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import prisma from "@/lib/prisma";

export const reassignProspectService = async (advisorId: string) => {
  const prospectsToReassign = await prisma.prospect.findMany({
    select: {
      id: true,
    },
  });

  for (const prospect of prospectsToReassign) {
    const nextAdvisorId = await getAdvisorWithLeastProspectsService();
    if (nextAdvisorId) {
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: {
          userId: nextAdvisorId,
        },
      });

      await prisma.user.update({
        where: { id: nextAdvisorId },
        data: {
          lastProspectAssigned: new Date(),
          isNewAdvisor: false,
        },
      });
    } else {
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: {
          userId: null,
        },
      });
    }
  }
};
