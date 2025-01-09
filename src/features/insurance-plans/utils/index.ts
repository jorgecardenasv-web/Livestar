import { InsurancePlan } from "@/shared/types/insurance";

export const calculateTotalPrice = (
  totalPrice: number,
  paymentType: string
): number => {
  const MONTHS_IN_YEAR = 12;

  if (paymentType === "Mensual") {
    totalPrice /= MONTHS_IN_YEAR;
  }

  return Math.round(totalPrice);
};

import { PriceData } from "../hooks/use-price-table";

export function flatPricesToJsonPrices(
  prices: PriceData[]
): Record<string, Record<string, Record<string, number>>> {
  return prices.reduce(
    (acc, price) => {
      acc[price.age] = {
        hombre: {
          mensual: price.monthlyPriceMale,
          anual: price.annualPriceMale,
        },
        mujer: {
          mensual: price.monthlyPriceFemale,
          anual: price.annualPriceFemale,
        },
      };
      return acc;
    },
    {} as Record<string, Record<string, Record<string, number>>>
  );
}

export function jsonPricesToFlatPrices(
  jsonPrices: Record<string, Record<string, Record<string, number>>>
): PriceData[] {
  console.log(
    Object.entries(jsonPrices).map(([age, genderPrices]) => {
      console.log(genderPrices);
    })
  );

  return Object.entries(jsonPrices).map(([age, genderPrices]) => ({
    age: parseInt(age),
    monthlyPriceMale: genderPrices.hombre.mensual,
    monthlyPriceFemale: genderPrices.mujer.mensual,
    annualPriceMale: genderPrices.hombre.anual,
    annualPriceFemale: genderPrices.mujer.anual,
  }));
}
