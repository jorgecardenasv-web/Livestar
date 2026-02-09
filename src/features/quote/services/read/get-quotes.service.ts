import prisma from "@/lib/prisma";
import { GetAllResponse } from "@/shared/types";
import { Quote as PrismaQuote } from "@generated/prisma/client";
import { FilterOptions } from "../../loaders/get-quotes.loader";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { PlanData, Quote } from "../../types";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getQuotesService = async ({
  page = "1",
  limit = "10",
  query,
  ...filtersOptions
}: FilterOptions): Promise<GetAllResponse<Quote>> => {
  try {
    const pageSize = Number(limit);
    const currentPage = Number(page);
    const skip = (currentPage - 1) * pageSize;

    const where = filterOptionsToWhere<PrismaQuote>(filtersOptions);

    const whereText = query
      ? textSearchFilterBuilder(query, [], {
          user: ["name", "email"],
          prospect: ["name", "email", "whatsapp"],
        })
      : undefined;

    console.log('📋 Listando cotizaciones en /cotizaciones:');
    console.log('  Filtros aplicados:', { where, whereText, page: currentPage, limit: pageSize });
    
    // Consulta para obtener cotizaciones básicas
    const [quotesRaw, count] = await Promise.all([
      prisma.quote.findMany({
        take: pageSize,
        skip,
        where: {
          ...where,
          ...whereText,
        } as any, // Utilizamos 'as any' para evitar problemas de tipo
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          prospect: true,
        },
      }),
      prisma.quote.count({
        where: {
          ...where,
          ...whereText,
        } as any, // Utilizamos 'as any' para evitar problemas de tipo
      }),
    ]);
    
    console.log('  📊 Cotizaciones encontradas:', count);
    if (quotesRaw.length > 0) {
      console.log('  🔝 Primera cotización:');
      console.log('    ID:', quotesRaw[0].id);
      console.log('    Prospecto:', quotesRaw[0].prospect?.name);
      console.log('    Email:', quotesRaw[0].prospect?.email);
      console.log('    Fecha creación (UTC):', quotesRaw[0].createdAt);
      console.log('    Fecha creación (ISO):', quotesRaw[0].createdAt.toISOString());
    }

    // Procesamos cada cotización individualmente para obtener datos adicionales
    const processedQuotes: Quote[] = [];

    for (const quote of quotesRaw) {
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
              planType?.name ||
              rawPlanData.planTypeName ||
              "Plan no disponible",
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

      processedQuotes.push(typedQuote);
    }

    return {
      success: true,
      data: {
        items: processedQuotes,
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage,
        itemsPerPage: pageSize,
      },
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
