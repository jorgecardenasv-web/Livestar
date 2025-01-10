import {
  InsuranceCompany,
  InsuranceCompany as InsuranceCompanyPrisma,
  InsurancePlan as InsurancePlanPrisma,
} from "@prisma/client";

export interface InsurancePlanTransformer extends InsurancePlanPrisma {
  company: InsuranceCompany;
}

export const InsuranceCompanyTransformer = (
  insuranceCompany: InsuranceCompanyPrisma
) => {
  return insuranceCompany
};

export const InsurancePlanTransformer = (
  plan: InsurancePlanTransformer
) => {
  return plan;
};
