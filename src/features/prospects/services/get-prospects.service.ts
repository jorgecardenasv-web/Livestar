import prisma from "@/lib/prisma";
import {
  textSearchFilterBuilder,
  whereFilterBuilder,
} from "@/shared/utils/where-filter-builder";
import { Prospect } from "@prisma/client";

interface GetProspectsService extends Partial<Prospect> {
  advisorId?: number;
  page: number;
  query: string;
}

interface GetAllProspectsByDateService {
  startDate: string;
  endDate: string;
}

export const getProspectsService = async ({
  advisorId: userId,
  page,
  isVerified,
  query,
}: GetProspectsService) => {
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  const where = whereFilterBuilder<Prospect>({
    userId,
    isVerified,
  });

  const whereText = textSearchFilterBuilder(query, ["name", "email"]);

  return await prisma.prospect.findMany({
    take: pageSize,
    skip,
    where: {
      ...where,
      ...whereText,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          uuid: true,
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
  });
};

export const getAllProspectsByDateService = async ({
  startDate,
  endDate,
}: GetAllProspectsByDateService) => {
  return await prisma.prospect.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};
