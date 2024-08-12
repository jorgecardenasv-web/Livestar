import { User as PrismaUser } from "@prisma/client";
import { User } from "../types/user";

export const userTransformer = (user: PrismaUser): User => {
  return {
    id: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
};