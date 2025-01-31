import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";

interface CreateTrackingNumberInput {
  quoteId: string;
}

export async function createTrackingNumberService({
  quoteId,
}: CreateTrackingNumberInput) {
  try {
    return await prisma.trackingNumber.create({
      data: {
        quoteId,
        number: generateTrackingNumber(),
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}

function generateTrackingNumber() {
  return `TM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
