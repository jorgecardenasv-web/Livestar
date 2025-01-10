import { getInsurancePlanByIdService } from "../services/get-insurance-plan-by-id.service";
import { jsonPricesToFlatPrices } from "../utils";

export const getInsurancePlanById = async (id: string) => {
  const insurancePlan = await getInsurancePlanByIdService(id);
  if (!insurancePlan || !insurancePlan.prices) {
    throw new Error("El plan o los precios del plan no se encuentran");
  }

  return {
    ...insurancePlan,
    prices: jsonPricesToFlatPrices(
      insurancePlan.prices as Record<
        string,
        Record<string, Record<string, number>>
      >
    ),
  };
};
