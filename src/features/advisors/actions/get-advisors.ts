"use server";

import prisma from "@/lib/prisma";
import { Advisor } from "../types/advisor";
import { advisorTransformer } from "../transformers/advisor-transformer";
import { revalidatePath } from "next/cache";

export const getAdvisors = async (page: number = 1) => {
  const pageSize = 6
  const skip = (page - 1) * pageSize

  const [advisors, totalAdvisors] = await Promise.all([
    prisma.user.findMany({
      take: pageSize,
      skip: skip,
      where: {
        role: "ADVISOR",
      },
    }),
    prisma.user.count({ where: { role: "ADVISOR" } }),
  ]);

  const totalPages = Math.ceil(totalAdvisors / pageSize)

  revalidatePath('/asesores')

  return {
    advisors: advisors.map(advisorTransformer),
    totalPages,
  }
};
