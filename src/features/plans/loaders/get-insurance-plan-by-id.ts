import { getInsurancePlanByIdService } from "../services/read/get-insurance-plan-by-id.service";
import {
  jsonPricesToFlatPrices,
  jsonPricesToFlatPricesHDI,
  normalizePlanData,
} from "../utils";

export const getInsurancePlanById = async (id: string) => {
  const insurancePlan = await getInsurancePlanByIdService(id);
  if (!insurancePlan || !insurancePlan.prices) {
    throw new Error("El plan o los precios del plan no se encuentran");
  }

  const normalizedPlan = normalizePlanData(insurancePlan);
  const prices = normalizedPlan.prices;
  const useHDIFormat = isHDIPriceFormat(prices);

  return {
    ...normalizedPlan,
    prices: useHDIFormat
      ? jsonPricesToFlatPricesHDI(prices as any)
      : jsonPricesToFlatPrices(prices as any),
  };
};

const isHDIPriceFormat = (prices: any): boolean => {
  const firstPrice = Object.values(prices)[0] as any;
  return firstPrice && "anual" in firstPrice && "primerMes" in firstPrice;
};
