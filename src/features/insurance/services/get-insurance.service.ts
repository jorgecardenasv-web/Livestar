import prisma from "@/lib/prisma";
import { GetAllResponse } from "@/shared/types";
import {
  filterOptionsToWhere,
  textSearchFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { FilterOptions } from "../loaders/get-insurance";
import { insuranceTransformer } from "../transformers/insurance-tranformer";
import { Insurance } from "../types/insurance";
import { Insurance as InsurancePrisma } from "@prisma/client";
import { getImage } from "@/shared/services/get-image.service";
import { handlePrismaError } from "@/shared/errors/prisma";

export const getInsuranceService = async ({
  page = "1",
  query,
  ...filtersWithoutQuery
}: FilterOptions): Promise<GetAllResponse<Insurance>> => {
  try {
    const pageSize = 10;
    const skip = (Number(page) - 1) * pageSize;

    const where = filterOptionsToWhere<InsurancePrisma>(filtersWithoutQuery);

    const whereText = query
      ? textSearchFilterBuilder(query, ["name"])
      : undefined;

    const [insurances, totalInsurances] = await Promise.all([
      prisma.insurance.findMany({
        take: pageSize,
        skip: skip,
        orderBy: {
          name: "asc",
        },
        where: {
          ...where,
          ...whereText,
        },
      }),
      prisma.insurance.count(),
    ]);

    const totalPages = Math.ceil(totalInsurances / pageSize);

    return {
      success: true,
      data: {
        items: insurances,
        totalPages,
        totalItems: totalInsurances,
        itemsPerPage: pageSize,
        currentPage: Number(page),
      },
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
};
