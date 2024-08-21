'use server'

import prisma from "@/lib/prisma"
import { User } from "../types/user"
import { userTransformer } from "../transformers/user-transformer"
import { revalidatePath } from "next/cache"

export const getUsers = async (page: number = 1) => {
  const pageSize = 6
  const skip = (page - 1) * pageSize

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      take: pageSize,
      skip: skip,
    }),
    prisma.user.count({ where: { role: "ADVISOR" } }),
  ]);

  const totalPages = Math.ceil(totalUsers / pageSize)

  revalidatePath('/dashboard')

  return {
    users: users.map(userTransformer),
    totalPages,
  }
}