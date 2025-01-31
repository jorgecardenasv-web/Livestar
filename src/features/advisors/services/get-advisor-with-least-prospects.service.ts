import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAdvisorWithLeastProspectsService = async () => {
  try {
    const newAdvisor = await prisma.user.findFirst({
      where: {
        role: "ASESOR",
        status: "ACTIVO",
        isNewAdvisor: true,
        lastProspectAssigned: null,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (newAdvisor) {
      return newAdvisor;
    }

    const nextAdvisor = await prisma.user.findFirst({
      where: {
        role: "ASESOR",
        status: "ACTIVO",
      },
      orderBy: [{ lastProspectAssigned: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return nextAdvisor ?? null;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
