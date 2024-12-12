import { InsurancePlan } from "@/shared/types/insurance";
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
  return {
    ...insuranceCompany,
    id: insuranceCompany.uuid,
  };
};

export const InsurancePlanTransformer = (
  plan: InsurancePlanTransformer
): InsurancePlan => {
  return {
    ...plan,
    id: plan.uuid,
    company: InsuranceCompanyTransformer(plan.company),
  };
};
