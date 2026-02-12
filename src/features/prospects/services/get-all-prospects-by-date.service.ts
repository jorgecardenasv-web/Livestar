import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAllProspectsByDateService = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    console.log('🔎 Buscando cotizaciones en DB:');
    console.log('  gte (>=):', startDate);
    console.log('  lte (<=):', endDate);
    
    const results = await prisma.quote.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: true,
        prospect: true,
      },
    });
    
    console.log('  Resultados:', results.length);
    
    return results;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
