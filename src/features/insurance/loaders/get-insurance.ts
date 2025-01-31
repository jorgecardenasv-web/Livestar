"use server";

import { getInsuranceService } from "../services/get-insurance.service";
import { insuranceTransformer } from "../transformers/insurance-tranformer";
import { Insurance } from "../types/insurance";

export interface FilterOptions extends Insurance {
  page: string;
  query?: string;
}

export const getInsurance = async (filterOptions: FilterOptions) => {
  return await getInsuranceService(filterOptions);
};
