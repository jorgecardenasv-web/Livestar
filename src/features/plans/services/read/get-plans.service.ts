import prisma from "@/lib/prisma";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { FilterOptions } from "../../loaders/get-plans";
import { GetAllResponse } from "@/shared/types";
import { Plan as PlanPrisma } from "@prisma/client";
import { Plan } from "../../types/plan";
import { getImage } from "@/shared/services/get-image.service";

export const GetPlansService = async ({
  page = "1",
  query,
  ...whereOptions
}: FilterOptions): Promise<GetAllResponse<Plan>> => {
  const pageSize = 10;
  const skip = (Number(page) - 1) * pageSize;

  const where =
    filterOptionsToWhere<Omit<PlanPrisma, "prices" | "deductibles">>(
      whereOptions
    );

  const whereText = query
    ? textSearchFilterBuilder(query, [], {
        company: ["name"],
        planType: ["name"],
      })
    : undefined;

  const [plans, totalPlans] = await Promise.all([
    prisma.plan.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        ...where,
        ...whereText,
      },
      include: {
        company: true,
        planType: true,
        quotes: true,
      },
    }),
    prisma.plan.count(),
  ]);

  const totalPages = Math.ceil(totalPlans / pageSize);

  return {
    success: true,
    data: {
      items: plans,
      totalPages,
      totalItems: totalPlans,
      itemsPerPage: pageSize,
      currentPage: Number(page),
    },
  };
};
