import { getInsurancePlanByIdService } from "../services/get-insurance-plan-by-id.service";
import { jsonPricesToFlatPrices, jsonPricesToFlatPricesHDI } from "../utils";

export const getInsurancePlanById = async (id: string) => {
  const insurancePlan = await getInsurancePlanByIdService(id);
  if (!insurancePlan || !insurancePlan.prices) {
    throw new Error("El plan o los precios del plan no se encuentran");
  }

  const isHDI = insurancePlan.company.name.includes("HDI");

  return {
    ...insurancePlan,
    prices: isHDI
      ? jsonPricesToFlatPricesHDI(
          insurancePlan.prices as Record<
            string,
            { anual: number; primerMes: number; segundoMesADoce: number }
          >
        )
      : jsonPricesToFlatPrices(
          insurancePlan.prices as Record<
            string,
            Record<string, Record<string, number>>
          >
        ),
  };
};
