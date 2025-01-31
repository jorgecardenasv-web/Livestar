import { GetPlansService } from "../services/read/get-plans.service";
import { InsurancePlanTransformer } from "../transformers/insurance-plan";
import { Plan } from "../types/plan";

export interface FilterOptions extends Plan {
  page: string;
  query?: string;
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
