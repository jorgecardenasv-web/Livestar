import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
interface CreateQuoteInput {
  prospectId: string;
  planId: string;
  customizations?: any;
  totalPrice: number;
  expirationDate?: Date;
}

export async function createQuoteService({
  prospectId,
  planId,
  totalPrice,
  expirationDate,
}: CreateQuoteInput) {
  try {
    return await prisma.quote.create({
      data: {
        prospectId,
        planId,
        totalPrice,
        expirationDate,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function getPlanByUuid(id: string) {
  try {
    return await prisma.plan.findUnique({
      where: { id },
      include: {
        company: true,
        planType: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}
