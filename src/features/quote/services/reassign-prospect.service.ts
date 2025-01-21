import { getAdvisorWithLeastProspectsService } from "@/features/advisors/services/get-advisor-with-least-prospects.service";
import prisma from "@/lib/prisma";

export const reassignProspectService = async (advisorId: string) => {
  const prospectsToReassign = await prisma.prospect.findMany({
    select: {
      id: true,
    },
  });

  for (const prospect of prospectsToReassign) {
    const nextAdvisor = await getAdvisorWithLeastProspectsService();
    if (nextAdvisor) {
      await prisma.prospect.update({
        where: { id: prospect.id },
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
      await prisma.prospect.update({
        where: { id: prospect.id },
        data: {
          userId: null,
        },
      });
    }
  }
};
