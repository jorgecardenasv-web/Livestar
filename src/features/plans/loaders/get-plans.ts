import { PlanType } from "@prisma/client";
import { GetPlansService } from "../services/read/get-plans.service";
import { InsurancePlanTransformer } from "../transformers/insurance-plan";
import { Plan } from "../types/plan";

export interface FilterOptions extends Partial<Plan> {
  page: string;
  query?: string;
  offset?: string;
  planTypeId?: string; // Opcional para permitir consultas sin filtro de plan
}

export const getPlans = async (filterOptions: FilterOptions) => {
  const { data, success } = await GetPlansService(filterOptions);

  return {
    success,
    data: {
      ...data,
      items: data.items.map((plan) => InsurancePlanTransformer(plan)),
    },
  };
};
