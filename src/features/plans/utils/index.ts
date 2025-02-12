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
  console.log(jsonPrices);

  return Object.entries(jsonPrices).map(([age, prices]) => ({
    age: parseInt(age),
    annualPrice: prices.anual,
    monthlyPrice1: prices.primerMes,
    monthlyPrice2to12: prices.segundoMesADoce,
  }));
}

function isHDIPriceTable(
  priceTable: any
): priceTable is Record<
  string,
  { anual: number; primerMes: number; segundoMesADoce: number }
> {
  const firstValue = Object.values(priceTable)[0];
  return (
    firstValue !== null &&
    typeof firstValue === "object" &&
    "anual" in firstValue
  );
}

function roundPrice(price: number): number {
  return Math.round(price);
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

  function getPriceForPerson(age: number, gender?: "mujer" | "hombre"): number {
    if (age >= 0 && age <= 84) {
      const ageKey = age.toString();

      if (isHDIPriceTable(priceTable)) {
        const prices = priceTable[ageKey];
        if (!prices) return 0;

        if (paymentType.toLowerCase() === "anual") {
          return roundPrice(prices.anual);
        } else {
          return roundPrice(prices.primerMes);
        }
      } else {
        return roundPrice(
          priceTable[ageKey]?.[gender || "hombre"]?.[
            paymentType.toLowerCase() as "anual" | "mensual"
          ] || 0
        );
      }
    }
    return 0;
  }

  if (data.protectWho === "mis_padres") {
    individualPrices.parents = [];

    if (data.additionalInfo?.dadAge) {
      const dadPrice = getPriceForPerson(
        data.additionalInfo.dadAge,
        isHDIPriceTable(priceTable) ? undefined : "hombre"
      );
      individualPrices.parents.push({
        name: "Padre",
        price: dadPrice,
      });
      totalPrice += dadPrice;
    }

    if (data.additionalInfo?.momAge) {
      const momPrice = getPriceForPerson(
        data.additionalInfo.momAge,
        isHDIPriceTable(priceTable) ? undefined : "mujer"
      );
      individualPrices.parents.push({
        name: "Madre",
        price: momPrice,
      });
      totalPrice += momPrice;
    }
  } else if (
    data.protectWho === "solo_mis_hijos" &&
    data.additionalInfo?.children
  ) {
    individualPrices.children = data.additionalInfo.children.map((child) => {
      const childPrice = getPriceForPerson(
        child.age,
        isHDIPriceTable(priceTable) ? undefined : child.gender
      );
      totalPrice += childPrice;
      return childPrice;
    });
  } else {
    individualPrices.main = getPriceForPerson(
      data.age,
      isHDIPriceTable(priceTable) ? undefined : data.gender || "hombre"
    );
    totalPrice += individualPrices.main;

    const validProtectWhoOptions = [
      "familia",
      "mis_hijos_y_yo",
      "mi_pareja_y_yo",
    ];

    if (validProtectWhoOptions.includes(data.protectWho)) {
      if (
        data.additionalInfo?.partnerAge &&
        data.additionalInfo?.partnerGender
      ) {
        individualPrices.partner = getPriceForPerson(
          data.additionalInfo.partnerAge,
          isHDIPriceTable(priceTable)
            ? undefined
            : data.additionalInfo.partnerGender
        );
        totalPrice += individualPrices.partner;
      }

      if (data.additionalInfo?.children) {
        individualPrices.children = data.additionalInfo.children.map(
          (child) => {
            const childPrice = getPriceForPerson(
              child.age,
              isHDIPriceTable(priceTable) ? undefined : child.gender
            );
            totalPrice += childPrice;
            return childPrice;
          }
        );
      }
    }

    if (data.protectWho === "otros") {
      individualPrices.others = [];
      data.additionalInfo?.protectedPersons?.map((other) => {
        const otherPrice = getPriceForPerson(other.age, other.gender);
        individualPrices?.others?.push({
          relationship: other.relationship || "Otro",
          price: otherPrice,
        });
        totalPrice += otherPrice;
        return;
      });
    }
  }

  return {
    coverage_fee: roundPrice(totalPrice),
    individualPrices: {
      main: roundPrice(individualPrices.main),
      partner: roundPrice(individualPrices.partner || 0),
      children: (individualPrices.children ?? []).map((price) =>
        roundPrice(price)
      ),
      parents: (individualPrices.parents || []).map((parent) => ({
        ...parent,
        price: roundPrice(parent.price),
      })),
      others: (individualPrices.others || []).map((other) => ({
        ...other,
        price: roundPrice(other.price),
      })),
      protectWho: data.protectWho,
    },
  };
}

export const normalizePlanData = (plan: any) => {
  return {
    ...plan,
    deductibles: plan.deductibles || {},
    company: {
      id: plan.company?.id || "",
      name: plan.company?.name || "",
    },
    planType: {
      id: plan.planType?.id || "",
      name: plan.planType?.name || "",
    },
  };
};
