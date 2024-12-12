import prisma from "@/lib/prisma";
interface CreateQuoteInput {
  prospectId: number;
  planId: number;
  customizations?: any;
  totalPrice: number;
  expirationDate?: Date;
}

export async function createQuoteService({
  prospectId,
  planId,
  customizations = {},
  totalPrice,
  expirationDate,
}: CreateQuoteInput) {
  const quote = await prisma.quote.create({
    data: {
      prospectId,
      planId,
      customizations,
      totalPrice,
      expirationDate,
    },
  });
  return quote;
}

export async function getPlanByUuid(uuid: string) {
  try {
    const plan = await prisma.insurancePlan.findUnique({
      where: { uuid },
      include: {
        company: true,
      },
    });

    if (!plan) {
      throw new Error(`No se encontró un plan con el uuid: ${uuid}`);
    }

    return plan;
  } catch (error) {
    console.error("Error al obtener el plan por uuid:", error);
    throw new Error("Hubo un problema al obtener el plan.");
  }
}
