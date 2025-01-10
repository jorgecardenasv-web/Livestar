import prisma from "@/lib/prisma";

interface CreateTrackingNumberInput {
  quoteId: string;
}

export async function createTrackingNumberService({
  quoteId,
}: CreateTrackingNumberInput) {
  const trackingNumber = await prisma.trackingNumber.create({
    data: {
      quoteId,
      number: generateTrackingNumber(),
    },
  });
  return trackingNumber;
}

function generateTrackingNumber() {
  return `TM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
