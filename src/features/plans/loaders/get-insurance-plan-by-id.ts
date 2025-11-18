import { getInsurancePlanByIdService } from "../services/read/get-insurance-plan-by-id.service";
import {
  jsonPricesToFlatPrices,
  jsonPricesToFlatPricesHDI,
  transformPlanData,
} from "../utils";
import { unstable_cache } from "next/cache";

// Cache la consulta del plan para mejorar el rendimiento
const getCachedPlan = unstable_cache(
  async (id: string) => {
    return await getInsurancePlanByIdService(id);
  },
  ["plan-details"], // clave del cache
  { tags: ["plan"], revalidate: 60 } // revalidar cada minuto
);

export const getInsurancePlanById = async (id: string) => {
  // Usamos la versión en caché para mejorar el rendimiento
  const insurancePlan = await getCachedPlan(id);
  if (!insurancePlan || !insurancePlan.prices) {
    throw new Error("El plan o los precios del plan no se encuentran");
  }

  const normalizedPlan = transformPlanData(insurancePlan);
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
