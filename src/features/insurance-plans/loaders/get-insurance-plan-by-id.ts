import { getInsurancePlanByIdService } from "../services/get-insurance-plan-by-id.service";
import { jsonPricesToFlatPrices } from "../utils";

export const getInsurancePlanById = async (id: string) => {
  const insurancePlan = await getInsurancePlanByIdService(id);
  return {
    ...insurancePlan,
    prices: jsonPricesToFlatPrices(insurancePlan.prices),
  }
};