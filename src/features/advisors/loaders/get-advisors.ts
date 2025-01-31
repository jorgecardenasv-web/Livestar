"use server";

import { getAdvisorsService } from "../services/get-advisors.service";
import { Advisor } from "../types/advisor";

export interface FilterOptions extends Advisor {
  page: string;
  query?: string;
}

export const getAdvisors = async (filterOptions: FilterOptions) => {
  return getAdvisorsService(filterOptions);
};
