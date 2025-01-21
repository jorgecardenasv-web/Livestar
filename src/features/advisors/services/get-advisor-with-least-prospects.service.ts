import prisma from "@/lib/prisma";

export const getAdvisorWithLeastProspectsService = async () => {
  const newAdvisor = await prisma.user.findFirst({
    where: {
      role: "ADVISOR",
      status: "ACTIVE",
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
      role: "ADVISOR",
      status: "ACTIVE",
    },
    orderBy: [{ lastProspectAssigned: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return nextAdvisor ?? null;
};
