import { Insurance as InsurancePrisma } from "@prisma/client";

export interface Insurance
  extends Pick<InsurancePrisma, "logo" | "name" | "createdAt" | "status"> {
  id: string;
}
