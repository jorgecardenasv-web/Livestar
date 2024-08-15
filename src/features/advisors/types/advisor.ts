import { User as PrismaUser } from "@prisma/client";

export interface Advisor extends Omit<PrismaUser, 'uuid' | "id" | "password"> {
  id: string,
}