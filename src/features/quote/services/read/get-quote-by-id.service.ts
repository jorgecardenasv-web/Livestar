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
        const rawPlanData =
          typeof quote.planData === "string"
            ? JSON.parse(quote.planData)
            : quote.planData;

        // Extraer los IDs
        const companyId = rawPlanData.companyId || "";
        const planTypeId = rawPlanData.planTypeId || "";

        // Buscar datos adicionales desde la base de datos
        const [company, planType] = await Promise.all([
          companyId
            ? prisma.insurance.findUnique({
                where: { id: companyId },
                select: { name: true, logo: true },
              })
            : null,
          planTypeId
            ? prisma.planType.findUnique({
                where: { id: planTypeId },
                select: { name: true },
              })
            : null,
        ]);

        // Asegurarnos de que tiene la estructura correcta
        parsedPlanData = {
          id: rawPlanData.id || "",
          companyId: companyId,
          // Usar el nombre de la compañía de la base de datos o del planData, o un valor por defecto
          companyName:
            company?.name ||
            rawPlanData.companyName ||
            "Compañía no disponible",
          // Usar el logo de la compañía de la base de datos o del planData
          companyLogo: company?.logo || rawPlanData.companyLogo,
          planTypeId: planTypeId,
          // Usar el nombre del tipo de plan de la base de datos o del planData, o un valor por defecto
          planTypeName:
            planType?.name || rawPlanData.planTypeName || "Plan no disponible",
          sumInsured: Number(rawPlanData.sumInsured) || 0,
          coInsurance: Number(rawPlanData.coInsurance) || 0,
          coInsuranceCap: Number(rawPlanData.coInsuranceCap) || 0,
          prices: rawPlanData.prices,
          deductibles: rawPlanData.deductibles,
          isRecommended: Boolean(rawPlanData.isRecommended),
          paymentType: rawPlanData.paymentType || "",
          coverageFee: Number(rawPlanData.coverageFee) || 0,
        };
      } catch (e) {
        console.error("Error parsing planData:", e);
      }
    }

    // Crear un objeto Quote con el planData tipado correctamente
    const typedQuote: Quote = {
      ...quote,
      planData: parsedPlanData as PlanData,
    };

    return typedQuote;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
