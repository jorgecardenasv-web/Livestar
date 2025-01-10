import prisma from "@/lib/prisma";
import {
  whereFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { InsuranceCompany } from "@prisma/client";

export const getInsuranceService = async ({
  page = 1,
  whereOptions,
}: {
  page?: number;
  whereOptions?: InsuranceCompany;
}) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const where = whereFilterBuilder<InsuranceCompany>(whereOptions || {});

  const [insurances, totalInsurances] = await Promise.all([
    prisma.insuranceCompany.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      where,
    }),
    prisma.insuranceCompany.count(),
  ]);

  const totalPages = Math.ceil(totalInsurances / pageSize);

  return {
    insurances,
    totalPages,
    totalInsurances,
    insurancesPerPage: pageSize,
  };
};
