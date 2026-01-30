import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAdvisorWithLeastQuotesService = async () => {
  try {
    // Obtener todos los asesores activos
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
    });

    if (activeAdvisors.length === 0) {
      return null;
    }

    // Ordenar manualmente: null primero, luego por fecha más antigua
    const sortedAdvisors = activeAdvisors.sort((a, b) => {
      // Si ambos son null, son iguales
      if (a.lastProspectAssigned === null && b.lastProspectAssigned === null) {
        return 0;
      }
      // Si solo a es null, a viene primero
      if (a.lastProspectAssigned === null) {
        return -1;
      }
      // Si solo b es null, b viene primero
      if (b.lastProspectAssigned === null) {
        return 1;
      }
      // Si ambos tienen fecha, ordenar por la más antigua (ascendente)
      return a.lastProspectAssigned.getTime() - b.lastProspectAssigned.getTime();
    });

    const selectedAdvisor = sortedAdvisors[0];

    return {
      id: selectedAdvisor.id,
      email: selectedAdvisor.email,
      name: selectedAdvisor.name,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
