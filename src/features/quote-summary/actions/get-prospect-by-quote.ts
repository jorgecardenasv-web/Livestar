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

  // Mapear a la estructura usada por getProspect()
  const { name, email, whatsapp, postalCode, age, protectWho, additionalInfo } = {
    name: quote.prospect.name,
    email: quote.prospect.email,
    whatsapp: quote.prospect.whatsapp || "",
    postalCode: quote.prospect.postalCode || "",
    age: (quote.prospect as any).age || undefined,
    protectWho: (quote.prospect as any).protectWho || undefined,
    additionalInfo: (quote.prospect as any).additionalInfo || undefined,
  };

  return {
    prospect: { name, email, whatsapp, postalCode, age },
    protectWho,
    additionalInfo,
  };
}