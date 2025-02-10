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

export function jsonPricesToFlatPricesHDI(
  jsonPrices: Record<
    string,
    { anual: number; primerMes: number; segundoMesADoce: number }
  >
): PriceDataHDI[] {
  return Object.entries(jsonPrices).map(([age, prices]) => ({
    age: parseInt(age),
    annualPrice: prices.anual,
    monthlyPrice1: prices.primerMes,
    monthlyPrice2to12: prices.segundoMesADoce,
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
    partner: 0,
    children: [],
    parents: [],
  };

  function getPriceForPerson(age: number, gender: "mujer" | "hombre"): number {
    if (age >= 0 && age <= 64) {
      const ageKey = age.toString();
      return (
        priceTable[ageKey]?.[gender]?.[
          paymentType.toLowerCase() as "anual" | "mensual"
        ] || 0
      );
    }
    return 0;
  }

  // Si el seguro es solo para los padres
  if (data.protectWho === "mis_padres") {
    individualPrices.parents = [];

    if (data.additionalInfo?.dadAge) {
      const dadPrice = getPriceForPerson(data.additionalInfo.dadAge, "hombre");
      individualPrices.parents.push({
        name: "Padre",
        price: dadPrice,
      });
      totalPrice += dadPrice;
    }

    if (data.additionalInfo?.momAge) {
      const momPrice = getPriceForPerson(data.additionalInfo.momAge, "mujer");
      individualPrices.parents.push({
        name: "Madre",
        price: momPrice,
      });
      totalPrice += momPrice;
    }
  }
  // Si el seguro es solo para los hijos, excluimos al asegurado principal
  else if (
    data.protectWho === "solo_mis_hijos" &&
    data.additionalInfo?.children
  ) {
    individualPrices.children = data.additionalInfo.children.map((child) => {
      const childPrice = getPriceForPerson(child.age, child.gender);
      totalPrice += childPrice;
      return childPrice;
    });
  } else {
    // Precio del asegurado principal
    individualPrices.main = getPriceForPerson(
      data.age,
      data.gender || "hombre"
    );
    totalPrice += individualPrices.main;

    const validProtectWhoOptions = [
      "familia",
      "mis_hijos_y_yo",
      "mi_pareja_y_yo",
    ];

    if (validProtectWhoOptions.includes(data.protectWho)) {
      // Precio de la pareja
      if (
        data.additionalInfo?.partnerAge &&
        data.additionalInfo?.partnerGender
      ) {
        individualPrices.partner = getPriceForPerson(
          data.additionalInfo.partnerAge,
          data.additionalInfo.partnerGender
        );
        totalPrice += individualPrices.partner;
      }

      // Precio de los hijos
      if (data.additionalInfo?.children) {
        individualPrices.children = data.additionalInfo.children.map(
          (child) => {
            const childPrice = getPriceForPerson(child.age, child.gender);
            totalPrice += childPrice;
            return childPrice;
          }
        );
      }
    }

    // Precio de otros asegurados
    if (data.protectWho === "otros") {
      individualPrices.others = [];
      data.additionalInfo?.protectedPersons?.map((other) => {
        const otherPrice = getPriceForPerson(other.age, other.gender);
        individualPrices?.others?.push({
          relationship: other.relationship || "Otro",
          price: otherPrice,
        });
        totalPrice += otherPrice;
        return
      });
    }
  }
  return {
    coverage_fee: totalPrice,
    individualPrices: {
      ...individualPrices,
      protectWho: data.protectWho,
    },
  };
}
