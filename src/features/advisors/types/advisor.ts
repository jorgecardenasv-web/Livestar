import type { User as PrismaUser } from "@generated/prisma/client";

export interface Advisor
  extends Omit<
    PrismaUser,
    "uuid" | "id" | "password" | "isNewAdvisor" | "lastProspectAssigned"
  > {
  id: string;
}
