"use server";

import { getInsuranceService } from "../services/get-insurance.service";
import { insuranceTransformer } from "../transformers/insurance-tranformer";

export const getInsurance = async () => {
  const response = await getInsuranceService({});

  return {
    ...response,
    insurances: response.insurances.map(insuranceTransformer),
  };
};
