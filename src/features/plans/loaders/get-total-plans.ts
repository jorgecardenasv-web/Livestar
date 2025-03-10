import { getTotalPlansService } from "../services/read/get-total-plans.service";
import { Plan } from "../types/plan";

export interface FilterOptions extends Partial<Plan> {
  page: string;
  query?: string;
  offset?: string;
  planTypeId?: string;
}

export const getTotalPlans = async () => {
  return await getTotalPlansService();
};
