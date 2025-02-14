import prisma from "@/lib/prisma";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { FilterOptions } from "../../loaders/get-plans";
import { GetAllResponse } from "@/shared/types";
import { Plan as PlanPrisma, Prisma } from "@prisma/client";
import { Plan } from "../../types/plan";
import { sleep } from "@/shared/utils/sleep";

export const GetPlansService = async ({
  page = "1",
  query,
  offset = "10",
  planTypeId,
  ...whereOptions
}: FilterOptions): Promise<GetAllResponse<Plan>> => {
  const pageSize = Number(offset);
  const skip = (Number(page) - 1) * pageSize;

  const where =
    filterOptionsToWhere<
      Omit<PlanPrisma, "prices" | "deductibles" | "planType">
    >(whereOptions);

  const whereText = query
    ? textSearchFilterBuilder(query, [], {
        company: ["name"],
        planType: ["name"],
      })
    : undefined;

  const planTypeCondition: Prisma.PlanWhereInput = planTypeId
    ? {
        OR: [
          { planTypeId },
          {
            planType: {
              OR: [
                {
                  name: {
                    contains: "hibrido",
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
                {
                  name: {
                    contains: "híbrido",
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
              ],
            },
          },
        ],
      }
    : {};

  const [plans, totalPlans] = await Promise.all([
    prisma.plan.findMany({
      take: pageSize,
      skip: skip,
      orderBy: [
        {
          planType: {
            orderIndex: "asc",
          },
        },
      ],
      where: {
        ...where,
        ...whereText,
        ...planTypeCondition,
      } satisfies Prisma.PlanWhereInput,
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
