import { User as PrismaUser } from "@prisma/client";

export interface User extends Omit<PrismaUser, 'uuid' | "id" | "password"> {
  id: string
}