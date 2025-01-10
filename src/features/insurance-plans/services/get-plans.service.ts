import prisma from "@/lib/prisma";
import { whereFilterBuilder } from "@/shared/utils/where-filter-builder";
import { InsuranceCompany, InsurancePlan } from "@prisma/client";

export const GetPlansService = async ({
  page = 1,
  whereOptions,
}: {
  page?: number;
  whereOptions?: InsurancePlan;
}) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const where = whereFilterBuilder<InsuranceCompany>(whereOptions || {});

  const [plans, totalPlans] = await Promise.all([
    prisma.insurancePlan.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where,
      include: {
        company: true,
      }
    }),
    prisma.insurancePlan.count(),
  ]);

  const totalPages = Math.ceil(totalPlans / pageSize);

  return {
    plans,
    totalPages,
    totalPlans,
    insurancesPerPage: pageSize,
  };
};
