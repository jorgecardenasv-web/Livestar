import type { PriceData } from "../hooks/use-price-table";
import type {
  HDIPriceTable,
  IndividualPriceDetails,
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
    age: Number.parseInt(age),
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
    age: Number.parseInt(age),
    annualPrice: prices.anual,
    monthlyPrice1: prices.primerMes,
    monthlyPrice2to12: prices.segundoMesADoce,
  }));
}

export function isHDIPriceTable(
  prices: PriceTable | HDIPriceTable
): prices is HDIPriceTable {
  if (Object.keys(prices).length === 0) {
    return false;
  }
  const firstPriceEntry = Object.values(prices)[0];
  return (
    typeof firstPriceEntry === "object" &&
    firstPriceEntry !== null &&
    "anual" in firstPriceEntry &&
    "primerMes" in firstPriceEntry &&
    "segundoMesADoce" in firstPriceEntry
  );
}

function roundPrice(price: number): number {
  return Math.round(price);
}

function getPriceForPerson(
  age: number,
  priceTable: PriceTable | HDIPriceTable, //we need to pass priceTable here so we can check wtf we will return to calculate
  paymentType = "mensual",
  gender?: "mujer" | "hombre"
): IndividualPriceDetails {
  if (age >= 0 && age <= 84) {
    const ageKey = age.toString();

    if (isHDIPriceTable(priceTable)) {
      const prices = priceTable[ageKey];
      if (!prices) return 0; //should return 0 if we cant find the price, maybe covered by the return 0 at the end

      //return the full HDIPriceDetails object
      return prices;
    }
    //or just return the single number
    return roundPrice(
      priceTable[ageKey]?.[gender || "hombre"]?.[
        paymentType.toLowerCase() as "anual" | "mensual"
      ] || 0
    );
  }
  return 0;
}

export function calculateInsurancePrice(
  data: InsuranceData,
  priceTable: PriceTable | HDIPriceTable,
  paymentType: string
): InsurancePriceResult {
  let totalPrice = 0;
  const individualPrices: InsurancePriceResult["individualPrices"] = {
    main: 0,
    partner: null,
    children: [],
    parents: [],
    others: [],
    protectWho: data.protectWho,
  };

  if (data.protectWho === "mis_padres") {
    individualPrices.parents = [];

    if (data.additionalInfo?.dadAge) {
      const dadPriceDetails = getPriceForPerson(
        data.additionalInfo.dadAge,
        priceTable,
        paymentType,
        isHDIPriceTable(priceTable) ? undefined : "hombre"
      );
      individualPrices.parents.push({
        name: "Padre",
        price: dadPriceDetails,
      });
      if (isHDIPriceTable(priceTable) && typeof dadPriceDetails !== "number") {
        totalPrice +=
          paymentType.toLowerCase() === "anual"
            ? dadPriceDetails.anual
            : dadPriceDetails.primerMes;
      } else if (typeof dadPriceDetails === "number") {
        totalPrice += dadPriceDetails;
      }
    }

    if (data.additionalInfo?.momAge) {
      const momPriceDetails = getPriceForPerson(
        data.additionalInfo.momAge,
        priceTable,
        paymentType,
        isHDIPriceTable(priceTable) ? undefined : "mujer"
      );
      individualPrices.parents.push({
        name: "Madre",
        price: momPriceDetails, // Store the details
      });
      if (isHDIPriceTable(priceTable) && typeof momPriceDetails !== "number") {
        totalPrice +=
          paymentType.toLowerCase() === "anual"
            ? momPriceDetails.anual
            : momPriceDetails.primerMes;
      } else if (typeof momPriceDetails === "number") {
        totalPrice += momPriceDetails;
      }
    }
  } else if (
    data.protectWho === "solo_mis_hijos" &&
    data.additionalInfo?.children
  ) {
    individualPrices.children = data.additionalInfo.children.map((child) => {
      const childPriceDetails = getPriceForPerson(
        child.age,
        priceTable,
        paymentType,
        isHDIPriceTable(priceTable) ? undefined : child.gender
      );
      //here we calculate total price based on payment type if HDI, otherwise we use the single price
      if (
        isHDIPriceTable(priceTable) &&
        typeof childPriceDetails !== "number"
      ) {
        totalPrice +=
          paymentType.toLowerCase() === "anual"
            ? childPriceDetails.anual
            : childPriceDetails.primerMes;
      } else if (typeof childPriceDetails === "number") {
        totalPrice += childPriceDetails;
      }
      return childPriceDetails;
    });
  } else {
    const mainPriceDetails = getPriceForPerson(
      data.age,
      priceTable,
      paymentType,
      isHDIPriceTable(priceTable) ? undefined : data.gender || "hombre"
    );
    individualPrices.main = mainPriceDetails;
    if (isHDIPriceTable(priceTable) && typeof mainPriceDetails !== "number") {
      totalPrice +=
        paymentType.toLowerCase() === "anual"
          ? mainPriceDetails.anual
          : mainPriceDetails.primerMes;
    } else if (typeof mainPriceDetails === "number") {
      totalPrice += mainPriceDetails;
    }

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
        const partnerPriceDetails = getPriceForPerson(
          data.additionalInfo.partnerAge,
          priceTable,
          paymentType,
          isHDIPriceTable(priceTable)
            ? undefined
            : data.additionalInfo.partnerGender
        );

        individualPrices.partner = partnerPriceDetails;

        if (
          isHDIPriceTable(priceTable) &&
          typeof partnerPriceDetails !== "number"
        ) {
          totalPrice +=
            paymentType.toLowerCase() === "anual"
              ? partnerPriceDetails.anual
              : partnerPriceDetails.primerMes;
        } else if (typeof partnerPriceDetails === "number") {
          totalPrice += partnerPriceDetails;
        }
      }

      if (data.additionalInfo?.children) {
        individualPrices.children = data.additionalInfo.children.map(
          (child) => {
            const childPriceDetails = getPriceForPerson(
              child.age,
              priceTable,
              paymentType,
              isHDIPriceTable(priceTable) ? undefined : child.gender
            );
            if (
              isHDIPriceTable(priceTable) &&
              typeof childPriceDetails !== "number"
            ) {
              totalPrice +=
                paymentType.toLowerCase() === "anual"
                  ? childPriceDetails.anual
                  : childPriceDetails.primerMes;
            } else if (typeof childPriceDetails === "number") {
              totalPrice += childPriceDetails;
            }
            return childPriceDetails;
          }
        );
      }
    }

    if (data.protectWho === "otros") {
      individualPrices.others = [];
      data.additionalInfo?.protectedPersons?.map((other) => {
        const otherPriceDetails = getPriceForPerson(
          other.age,
          priceTable,
          other.gender
        );
        individualPrices?.others?.push({
          relationship: other.relationship || "Otro",
          price: otherPriceDetails,
        });
        if (
          isHDIPriceTable(priceTable) &&
          typeof otherPriceDetails !== "number"
        ) {
          totalPrice +=
            paymentType.toLowerCase() === "anual"
              ? otherPriceDetails.anual
              : otherPriceDetails.primerMes;
        } else if (typeof otherPriceDetails === "number") {
          totalPrice += otherPriceDetails;
        }
        return;
      });
    }
  }

  return {
    coverage_fee: roundPrice(totalPrice),
    individualPrices: {
      main: individualPrices.main,
      partner: individualPrices.partner,
      children: individualPrices.children,
      parents: individualPrices.parents,
      others: individualPrices.others,
      protectWho: data.protectWho,
    },
  };
}

export const normalizePlanData = (plan: any) => {
  return {
    ...plan,
    deductibles: plan.deductibles || {},
    additionalInfoHtml: plan.additionalInfoHtml || null,
    company: {
      id: plan.company?.id || "",
      name: plan.company?.name || "",
      logo: plan.company?.logo || "",
    },
    planType: {
      id: plan.planType?.id || "",
      name: plan.planType?.name || "",
    },
  };
};
