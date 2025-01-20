import prisma from "@/lib/prisma";
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
  const quote = await prisma.quote.create({
    data: {
      prospectId,
      planId,
      totalPrice,
      expirationDate,
    },
  });
  return quote;
}

export async function getPlanByUuid(id: string) {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      include: {
        company: true,
        planType: true,
      },
    });

    if (!plan) {
      throw new Error(`No se encontró un plan con el uuid: ${id}`);
    }

    return plan;
  } catch (error) {
    console.error("Error al obtener el plan por uuid:", error);
    throw new Error("Hubo un problema al obtener el plan.");
  }
}
