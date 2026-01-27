import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAdvisorWithLeastQuotesService = async () => {
  try {
    const activeAdvisors = await prisma.user.findMany({
      where: {
        role: 'ASESOR',
        status: 'ACTIVO',
      },
      select: {
        id: true,
        email: true,
        name: true,
        lastProspectAssigned: true,
      },
      orderBy: {
        lastProspectAssigned: 'asc', // null primero, luego fechas más antiguas
      },
    });

    if (activeAdvisors.length === 0) {
      return null;
    }

    // Los asesores con lastProspectAssigned = null tienen prioridad
    // Gracias al orderBy 'asc', ellos vienen primero
    const selectedAdvisor = activeAdvisors[0];

    return {
      id: selectedAdvisor.id,
      email: selectedAdvisor.email,
      name: selectedAdvisor.name,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
