import prisma from "@/lib/prisma";
import {
  whereFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { Insurance } from "@prisma/client";

export const getInsuranceService = async ({
  page = 1,
  whereOptions,
}: {
  page?: number;
  whereOptions?: Insurance;
}) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const where = whereFilterBuilder<Insurance>(whereOptions || {});

  const [insurances, totalInsurances] = await Promise.all([
    prisma.insurance.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where,
    }),
    prisma.insurance.count(),
  ]);

  const totalPages = Math.ceil(totalInsurances / pageSize);

  return {
    insurances,
    totalPages,
    totalInsurances,
    insurancesPerPage: pageSize,
  };
};
