import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

function generateTrackingNumber() {
  return `TM-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
}

export async function createQuoteService(data: any) {
  const {
    name,
    gender,
    postalCode,
    protectWho,
    whatsapp,
    email,
    age,
    ...additionalInfo
  } = data.prospectData;

  const { coverage_fee, id: planId } = data.plan;

  try {
    return await prisma.$transaction(async (tx) => {
      const newProspect = await tx.prospect.create({
        data: {
          name,
          email,
          gender,
          whatsapp,
          age,
          postalCode,
        },
      });

      const newQuote = await tx.quote.create({
        data: {
          protectWho: protectWho,
          totalPrice: Number(coverage_fee),
          additionalInfo,
          planId,
          medicalHistories: data.medicalData,
          prospectId: newProspect.id,
        },
      });

      await tx.trackingNumber.create({
        data: {
          number: generateTrackingNumber(),
          quoteId: newQuote.id,
        },
      });
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}
