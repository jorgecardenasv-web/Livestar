import {
  InsuranceCompany as InsuranceCompanyPrisma,
  InsurancePlan as InsurancePlanPrisma,
} from "@prisma/client";

export interface InsuranceCompany
  extends Omit<InsuranceCompanyPrisma, "id" | "uuid"> {
  id: string;
}

export interface InsurancePlan
  extends Omit<InsurancePlanPrisma, "id" | "uuid"> {
  id: string;
  company: InsuranceCompany;
}
