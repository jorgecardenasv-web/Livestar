import { InsurancePlan } from "@/shared/types/insurance";

// export const calculateTotalPrice = (
//   totalPrice: InsurancePlan["totalPrice"],
//   paymentType: string,
// ): number => {
//   const MONTHS_IN_YEAR = 12;

//   if (paymentType === "Mensual") {
//     totalPrice /= MONTHS_IN_YEAR;
//   }

//   return Math.round(totalPrice);
// };


import { PriceData } from '../hooks/use-price-table';

export function flatPricesToJsonPrices(prices: PriceData[]): Record<string, Record<string, Record<string, number>>> {
  return prices.reduce((acc, price) => {
    acc[price.age] = {
      male: {
        monthly: price.monthlyPriceMale,
        annual: price.annualPriceMale,
      },
      female: {
        monthly: price.monthlyPriceFemale,
        annual: price.annualPriceFemale,
      },
    };
    return acc;
  }, {} as Record<string, Record<string, Record<string, number>>>);
}

export function jsonPricesToFlatPrices(jsonPrices: Record<string, Record<string, Record<string, number>>>): PriceData[] {
  return Object.entries(jsonPrices).map(([age, genderPrices]) => ({
    age: parseInt(age),
    monthlyPriceMale: genderPrices.male.monthly,
    monthlyPriceFemale: genderPrices.female.monthly,
    annualPriceMale: genderPrices.male.annual,
    annualPriceFemale: genderPrices.female.annual,
  }));
}

