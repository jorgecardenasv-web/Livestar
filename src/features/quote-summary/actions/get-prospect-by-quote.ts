"use server";

import { getQuoteByIdService } from "@/features/quote/services/read/get-quote-by-id.service";

export async function getProspectByQuoteId(quoteId: string) {
  const quote = await getQuoteByIdService(quoteId);
  if (!quote || !quote.prospect) {
    return {
      prospect: {},
      protectWho: undefined,
      additionalInfo: undefined,
    };
  }

  // Los datos del prospect vienen de la relación prospect
  const prospect = {
    name: quote.prospect.name,
    email: quote.prospect.email,
    whatsapp: quote.prospect.whatsapp || "",
    postalCode: quote.prospect.postalCode || "",
    age: quote.prospect.age || undefined,
    gender: quote.prospect.gender || undefined,
  };

  // protectWho y additionalInfo están en el quote, no en el prospect
  const protectWho = quote.protectWho || undefined;

  // Parsear additionalInfo y manejar estructura anidada si existe
  let additionalInfo = quote.additionalInfo
    ? typeof quote.additionalInfo === "string"
      ? JSON.parse(quote.additionalInfo)
      : quote.additionalInfo
    : undefined;

  // Si additionalInfo tiene una propiedad additionalInfo anidada, desenvolverla
  if (additionalInfo && additionalInfo.additionalInfo) {
    additionalInfo = additionalInfo.additionalInfo;
  }

  return {
    prospect,
    protectWho,
    additionalInfo,
    medicalHistories: quote.medicalHistories || [],
  };
}
