import { Quote as PrismaQuote, Prospect, User } from "@prisma/client";

interface QuotePayload extends PrismaQuote {
  user?: User;
  prospect: Prospect;
}

export const prospectTransformer = (quote: QuotePayload) => {
  return {
    id: quote.id,
    name: quote?.prospect.name,
    email: quote.prospect.email,
    createdAt: quote.createdAt,
    updatedAt: quote.updatedAt,
    additionalInfo: quote.additionalInfo,
    gender: quote.prospect.gender,
    age: quote.prospect.age,
    postalCode: quote.prospect.postalCode,
    protectWho: quote.protectWho,
    whatsapp: quote.prospect.whatsapp,
    userId: quote.userId,
    lastContactDate: quote.lastContactDate,
    user: quote.user,
    status: quote.status,
  };
};
