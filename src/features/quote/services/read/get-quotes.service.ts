import prisma from "@/lib/prisma";
import { GetAllResponse } from "@/shared/types";
import { Quote as PrismaQuote } from "@prisma/client";
import { FilterOptions } from "../../loaders/get-quotes.loader";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { Quote } from "../../types";

export const getQuotesService = async ({
  page = "1",
  limit = "10",
  query,
  ...filtersOptions
}: FilterOptions): Promise<GetAllResponse<Quote>> => {
  const pageSize = Number(limit);
  const currentPage = Number(page);
  const skip = (currentPage - 1) * pageSize;

  const where =
    filterOptionsToWhere<
      Omit<PrismaQuote, "customizations" | "additionalInfo">
    >(filtersOptions);

  const whereText = query
    ? textSearchFilterBuilder(query, [], {
        user: ["name", "email"],
        prospect: ["name", "email", "whatsapp"],
      })
    : undefined;

  const [quotes, count] = await Promise.all([
    prisma.quote.findMany({
      take: pageSize,
      skip,
      where: {
        ...where,
        ...whereText,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        prospect: true,
        medicalHistories: true,
      },
    }),
    prisma.quote.count({
      where: {
        ...where,
        ...whereText,
      },
    }),
  ]);

  return {
    success: true,
    data: {
      items: quotes,
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage,
      itemsPerPage: pageSize,
    },
  };
};
