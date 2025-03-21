import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { PlanData, Quote } from "../../types";

export const getQuoteByIdService = async (
  quoteId: string
): Promise<Quote | null> => {
  try {
    const quote = await prisma.quote.findUnique({
      where: {
        id: quoteId,
      },
      include: {
        prospect: true,
        user: true,
      },
    });

    if (!quote) return null;

    // Parsear planData si existe
    let parsedPlanData: PlanData | null = null;
    if (quote.planData) {
      try {
        const rawPlanData = typeof quote.planData === 'string' 
          ? JSON.parse(quote.planData) 
          : quote.planData;
        
        // Asegurarnos de que tiene la estructura correcta
        parsedPlanData = {
          id: rawPlanData.id || '',
          companyId: rawPlanData.companyId || '',
          companyName: rawPlanData.companyName || '',
          companyLogo: rawPlanData.companyLogo,
          planTypeId: rawPlanData.planTypeId || '',
          planTypeName: rawPlanData.planTypeName || '',
          sumInsured: Number(rawPlanData.sumInsured) || 0,
          coInsurance: Number(rawPlanData.coInsurance) || 0,
          coInsuranceCap: Number(rawPlanData.coInsuranceCap) || 0,
          prices: rawPlanData.prices,
          deductibles: rawPlanData.deductibles,
          isRecommended: Boolean(rawPlanData.isRecommended),
          paymentType: rawPlanData.paymentType || '',
          coverageFee: Number(rawPlanData.coverageFee) || 0,
        };
      } catch (e) {
        console.error('Error parsing planData:', e);
      }
    }

    // Crear un objeto Quote con el planData tipado correctamente
    const typedQuote: Quote = {
      ...quote,
      planData: parsedPlanData as PlanData
    };

    return typedQuote;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
