import { InsuranceCompany, InsurancePlan } from "@prisma/client";

export interface Plan extends Pick<InsurancePlan, "id" | "status" | "createdAt" | "name"> {
  company: InsuranceCompany
}
