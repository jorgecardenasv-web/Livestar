import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { FormDataMedical } from "../../types";

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

      console.log({ newProspect });

      const newQuote = await tx.quote.create({
        data: {
          protectWho: protectWho,
          totalPrice: Number(coverage_fee),
          additionalInfo,
          planId,
          medicalHistories: data.forms,
          prospectId: newProspect.id,
        },
      });

      console.log({ newQuote });

      const newTrackingNumber = await tx.trackingNumber.create({
        data: {
          number: generateTrackingNumber(),
          quoteId: newQuote.id,
        },
      });

      console.log({ newTrackingNumber });
    });
  } catch (error) {
    console.log({ error });

    throw handlePrismaError(error);
  }
}
