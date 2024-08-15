'use server'

import prisma from "@/lib/prisma"
import { User } from "../types/user"
import { userTransformer } from "../transformers/user-transformer"

export const getUsers = (): Promise<User[]> => {
  return prisma.user.findMany().then((users) => users.map(userTransformer))
}