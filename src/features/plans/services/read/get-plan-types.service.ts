import prisma from "@/lib/prisma";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { PlanType } from "@prisma/client";
import { GetAllResponse } from "@/shared/types";
import { FilterOptions } from "../../loaders/get-plan-types";

export const getPlanTypesService = async ({
  page = "1",
  query,
  offset = "10",
  ...filterOptions
}: FilterOptions): Promise<GetAllResponse<PlanType>> => {
  const pageSize = Number(offset);
  const skip = page ? (Number(page) - 1) * pageSize : undefined;

  const where = filterOptionsToWhere<PlanType>(filterOptions);

  const whereText = query
    ? textSearchFilterBuilder(query, ["name"])
    : undefined;

  const [planTypes, count] = await Promise.all([
    prisma.planType.findMany({
      where: {
        ...where,
        ...whereText,
      },
      skip,
      take: pageSize,
      orderBy: {
        orderIndex: "asc",
      },
    }),
    prisma.planType.count({
      where: {
        ...where,
        ...whereText,
      },
    }),
  ]);

  const totalPages = Math.ceil(count / pageSize);

  return {
    success: true,
    data: {
      items: planTypes,
      totalItems: count,
      totalPages,
      itemsPerPage: pageSize,
      currentPage: Number(page),
    },
  };
};

export const GetPlanTypesService = async () => {
  const planTypes = await prisma.planType.findMany({
    where: {
      name: {
        not: "Hibrido",
      },
    },
    orderBy: {
      orderIndex: "asc",
    },
  });

  return planTypes;
};
