'use server'

import prisma from "@/lib/prisma";
import { userTransformer } from "../transformers/user-transformer";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users.map((user) => (userTransformer(user)));
}