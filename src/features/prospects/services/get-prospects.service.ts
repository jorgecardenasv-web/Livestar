import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/shared/errors/prisma";
import { GetAllResponse } from "@/shared/types";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { Prospect } from "@prisma/client";

interface GetProspectsService extends Partial<Prospect> {
  advisorId?: string;
  page: number;
  query: string;
}

export const getProspectsService = async ({
  advisorId: userId,
  page,
  query,
  ...filtersWithoutQuery
}: GetProspectsService): Promise<
  GetAllResponse<
    Prospect & {
      user: {
        name: string;
        email: string;
        id: string;
      } | null;
    }
  >
> => {
  try {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const where =
      filterOptionsToWhere<Omit<Prospect, "additionalInfo">>(
        filtersWithoutQuery
      );

    const whereText = query
      ? textSearchFilterBuilder(query, ["name", "email", "whatsapp"])
      : undefined;

    const [prospects, count] = await Promise.all([
      prisma.prospect.findMany({
        take: pageSize,
        skip,
        where: {
          ...where,
          ...whereText,
        },
        include: {
          quotes: {
            select: {
              status: true,
            },
          },
        },
        orderBy: [
          {
            isVerified: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
      prisma.prospect.count({
        where: {
          ...where,
          ...whereText,
        },
      }),
    ]);

    return {
      success: true,
      data: {
        items: prospects,
        totalItems: count,
        itemsPerPage: pageSize,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
      },
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
