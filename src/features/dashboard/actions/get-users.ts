"use server";

import prisma from "@/lib/prisma";
import { User } from "../types/user";
import { userTransformer } from "../transformers/user-transformer";
import { revalidatePath } from "next/cache";
import { whereFilterBuilder } from "@/shared/utils/where-filter-builder";

export const getUsers = async ({
  page = 1,
  status,
  role,
}: {
  page?: number;
  status?: string;
  role?: string;
}) => {
  const pageSize = 6;
  const skip = (page - 1) * pageSize;
  const where = whereFilterBuilder<User>({ role, status });
  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      take: pageSize,
      skip: skip,
      where,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  revalidatePath("/dashboard");

  return {
    users: users.map(userTransformer),
    totalPages,
    totalUsers,
    usersPerPage: pageSize,
  };
};
