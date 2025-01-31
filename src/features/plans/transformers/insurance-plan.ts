import { Insurance } from "@prisma/client";
import { Plan } from "../types/plan";

export const InsuranceCompanyTransformer = (insuranceCompany: Insurance) => {
  return insuranceCompany;
};

export const InsurancePlanTransformer = (plan: Plan) => plan;
