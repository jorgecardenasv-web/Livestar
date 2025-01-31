import { PlanType } from "@prisma/client";
import { getPlanTypesService } from "../services/read/get-plan-types.service";

export interface FilterOptions extends Partial<PlanType> {
  page: string;
  query?: string;
  offset?: string;
}

export const getPlanTypes = async (filterOptions: FilterOptions) =>
  getPlanTypesService(filterOptions);
