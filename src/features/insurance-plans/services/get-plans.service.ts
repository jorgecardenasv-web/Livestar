import prisma from "@/lib/prisma";
import { whereFilterBuilder } from "@/shared/utils/where-filter-builder";
import { Insurance, Plan } from "@prisma/client";

export const GetPlansService = async ({
  page = 1,
  whereOptions,
}: {
  page?: number;
  whereOptions?: Plan;
}) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const where = whereFilterBuilder<Insurance>(whereOptions || {});

  const [plans, totalPlans] = await Promise.all([
    prisma.plan.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where,
      include: {
        company: true,
        planType: true,
      }
    }),
    prisma.plan.count(),
  ]);

  const totalPages = Math.ceil(totalPlans / pageSize);

  return {
    plans,
    totalPages,
    totalPlans,
    insurancesPerPage: pageSize,
  };
};
