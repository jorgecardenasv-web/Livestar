import { PriceData } from "../hooks/use-price-table";
import {
  InsuranceData,
  InsurancePriceResult,
  PriceDataHDI,
  PriceTable,
} from "../types";

export const flatPricesToJsonPrices = (
  prices: PriceData[]
): Record<string, Record<string, Record<string, number>>> => {
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
};

export const flatPricesToJsonPricesHDI = (
  prices: PriceDataHDI[]
): Record<
  string,
  { anual: number; primerMes: number; segundoMesADoce: number }
> => {
  return prices.reduce(
    (acc, price) => {
      acc[price.age] = {
        anual: price.annualPrice,
        primerMes: price.monthlyPrice1,
        segundoMesADoce: price.monthlyPrice2to12,
      };
      return acc;
    },
    {} as Record<
      string,
      { anual: number; primerMes: number; segundoMesADoce: number }
    >
  );
};

export function jsonPricesToFlatPrices(
  jsonPrices: Record<string, Record<string, Record<string, number>>>
): PriceData[] {
  return Object.entries(jsonPrices).map(([age, genderPrices]) => ({
    age: parseInt(age),
    monthlyPriceMale: genderPrices.hombre.mensual,
    monthlyPriceFemale: genderPrices.mujer.mensual,
    annualPriceMale: genderPrices.hombre.anual,
    annualPriceFemale: genderPrices.mujer.anual,
  }));
}

export function calculateInsurancePrice(
  data: InsuranceData,
  priceTable: PriceTable,
  paymentType: string
): InsurancePriceResult {
  let totalPrice = 0;
  let individualPrices: InsurancePriceResult["individualPrices"] = {
    main: 0,
    children: [],
  };

  function getPriceForPerson(age: number, gender: "mujer" | "hombre"): number {
    if (age >= 0 && age <= 64) {
      const ageKey = age.toString();
      if (priceTable[ageKey] && priceTable[ageKey][gender]) {
        return priceTable[ageKey][gender][
          paymentType.toLowerCase() as "anual" | "mensual"
        ];
      }
    }
    return 0;
  }

  individualPrices.main = getPriceForPerson(data.age, data.gender || "hombre");
  totalPrice += individualPrices.main;

  if (data.protectWho === "familia") {
    if (data.additionalInfo?.partnerAge) {
      individualPrices.partner = getPriceForPerson(
        data.additionalInfo.partnerAge,
        data.additionalInfo.partnerGender
      );
      totalPrice += individualPrices.partner;
    }

    if (data.additionalInfo?.children) {
      individualPrices.children = data.additionalInfo.children.map((child) => {
        const childPrice = getPriceForPerson(child.age, child.gender);
        totalPrice += childPrice;
        return childPrice;
      });
    }
  }

  return {
    coverage_fee: totalPrice,
    individualPrices,
  };
}
