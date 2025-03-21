import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

export const deleteQuoteService = async (quoteId: string): Promise<void> => {
  try {
    // Primero obtenemos la cotización para obtener el ID del prospecto
    const quote = await prisma.quote.findUnique({
      where: {
        id: quoteId,
      },
      select: {
        prospectId: true,
      },
    });

    if (!quote) {
      throw new Error("Cotización no encontrada");
    }

    // Eliminamos la cotización
    await prisma.quote.delete({
      where: {
        id: quoteId,
      },
    });

    // Verificamos si el prospecto tiene otras cotizaciones
    const otherQuotes = await prisma.quote.findFirst({
      where: {
        prospectId: quote.prospectId,
      },
    });

    // Si el prospecto no tiene otras cotizaciones, lo eliminamos
    if (!otherQuotes) {
      await prisma.prospect.delete({
        where: {
          id: quote.prospectId,
        },
      });
    }
  } catch (error) {
    throw handlePrismaError(error);
  }
};
