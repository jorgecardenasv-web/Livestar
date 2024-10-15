import { Prospect as PrismaProspect, User } from "@prisma/client";

export interface Prospect extends Omit<PrismaProspect, "id" | "uuid" | "assignmentOrder"> {
  id: string
  user?: User
}
