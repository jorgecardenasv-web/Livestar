import { InsuranceCompany, InsurancePlan } from "@prisma/client";

export interface Plan extends Pick<InsurancePlan, "uuid" | "status" | "createdAt" | "name"> {
  id: string
  company: InsuranceCompany
}
