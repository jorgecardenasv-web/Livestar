"use server";

import { getAdvisorsService } from "../services/get-advisors.service";
import { Advisor } from "../types/advisor";

export interface FilterOptions extends Partial<Advisor> {
  page: string;
  query?: string;
  offset?: string;
}

export const getAdvisors = async (filterOptions: FilterOptions) => {
  return getAdvisorsService(filterOptions);
};
