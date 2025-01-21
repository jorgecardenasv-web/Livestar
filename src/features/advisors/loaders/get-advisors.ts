"use server";

import prisma from "@/lib/prisma";
import { advisorTransformer } from "../transformers/advisor-transformer";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAdvisors = async ({
  page = 1,
  status,
}: {
  page?: number;
  status?: string;
}) => {
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const whereClause: any = { role: "ASESOR" };
  if (status) {
    whereClause.status = status;
  }

  const [advisors, totalAdvisors] = await Promise.all([
    prisma.user.findMany({
      take: pageSize,
      skip: skip,
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalAdvisors / pageSize);

  revalidateTag("asesores");

  return {
    advisors: advisors.map(advisorTransformer),
    totalPages,
    totalAdvisors,
    advisorsPerPage: pageSize,
  };
};
