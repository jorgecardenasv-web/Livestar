import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { QuoteStatus } from "@generated/prisma/client";

export const changeAdvisorService = async (
  prospectId: string,
  data: {
    userId?: string;
    status: QuoteStatus;
  }
) => {
  try {
    // Construir el objeto de actualización solo con los campos presentes
    const updateData: { status: QuoteStatus; userId?: string } = {
      status: data.status,
    };

    // Solo incluir userId si está presente
    if (data.userId) {
      updateData.userId = data.userId;
    }

    return await prisma.quote.update({
      where: {
        id: prospectId,
      },
      data: updateData,
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};
