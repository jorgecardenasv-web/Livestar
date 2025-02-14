import prisma from "@/lib/prisma";
import { advisorTransformer } from "../transformers/advisor-transformer";
import { GetAllResponse } from "@/shared/types";
import { Advisor } from "../types/advisor";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { User } from "@prisma/client";
import { FilterOptions } from "../loaders/get-advisors";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getAdvisorsService = async ({
  page = "1",
  query,
  offset = "10",
  ...filtersWithoutQuery
}: FilterOptions): Promise<GetAllResponse<Advisor>> => {
  try {
    const pageSize = Number(offset);
    const skip = (Number(page) - 1) * pageSize;

    const where = filterOptionsToWhere<User>(filtersWithoutQuery);

    const whereText = query
      ? textSearchFilterBuilder(query, ["name", "email"])
      : undefined;

    const [advisors, totalAdvisors] = await Promise.all([
      prisma.user.findMany({
        take: pageSize,
        skip: skip,
        where: {
          ...where,
          ...whereText,
          role: "ASESOR",
        },
        orderBy: {
          name: "asc",
        },
      }),
      prisma.user.count({
        where: {
          ...where,
          ...whereText,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalAdvisors / pageSize);

    return {
      success: true,
      data: {
        items: advisors.map(advisorTransformer),
        totalPages,
        totalItems: totalAdvisors,
        itemsPerPage: pageSize,
        currentPage: Number(page),
      },
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
