import { Insurance as InsurancePrisma } from "@generated/prisma/client";

export interface Insurance
  extends Pick<InsurancePrisma, "logo" | "name" | "createdAt" | "status"> {
  id: string;
}
