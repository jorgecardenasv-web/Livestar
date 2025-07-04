import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAdvisorWithLeastQuotesService = async () => {
  try {
    const advisorsWithQuoteCounts = await prisma.user.findMany({
      where: {
        role: 'ASESOR',
        status: 'ACTIVO',
      },
      select: {
        id: true,
        email: true,
        name: true,
        _count: {
          select: {
            Quote: true,
          },
        },
      },
    });

    if (advisorsWithQuoteCounts.length === 0) {
      return null;
    }

    const sortedAdvisors = advisorsWithQuoteCounts.sort(
      (a, b) => a._count.Quote - b._count.Quote
    );

    const leastBusyAdvisor = sortedAdvisors[0];

    return {
      id: leastBusyAdvisor.id,
      email: leastBusyAdvisor.email,
      name: leastBusyAdvisor.name,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
