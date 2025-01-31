import { PlanType } from "@prisma/client";
import { getPlanTypesSirvice } from "../services/read/get-plan-types.service";

export interface FilterOptions extends PlanType {
  page: string;
  query?: string;
}

export const getPlanTypes = async (filterOptions: FilterOptions) =>
  getPlanTypesSirvice(filterOptions);
