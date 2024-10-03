import { InsurancePlan } from "@prisma/client";

export const InsurancePlanTransformer = (plan: InsurancePlan) => {
  return {
    ...plan,
    id: plan.uuid,
  };
};