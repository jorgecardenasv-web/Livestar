import { User as PrismaUser } from "@prisma/client";
import { Advisor } from "../types/advisor";

export const advisorTransformer = (user: PrismaUser): Advisor => {
  return {
    id: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
};