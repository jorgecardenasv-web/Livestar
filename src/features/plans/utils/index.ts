import type { PriceData } from "../hooks/use-price-table";
import type {
  HDIPriceTable,
  IndividualPriceDetails,
  InsuranceData,
  InsurancePriceResult,
  PriceDataHDI,
  PriceTable,
} from "../types";
import type { Plan } from "../types/plan";

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
  priceTable: PriceTable | HDIPriceTable,
  paymentType = "mensual",
  gender?: "mujer" | "hombre"
): IndividualPriceDetails {
  if (age >= 0 && age <= 84) {
    const ageKey = age.toString();

    if (isHDIPriceTable(priceTable)) {
      const prices = priceTable[ageKey];
      if (!prices) return 0;

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

export const transformPlanData = (plan: any): Plan => {
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

/**
 * Determina qué opción usar basándose en las edades de los integrantes de la cotización
 * opcion_2: para menores de 45 años
 * opcion_4: para mayores de 45 años
 * Si hay integrantes de ambos grupos, se usa la opción que incluya a todos (opcion_4)
 */
export const getAgeBasedOption = (
  prospect: any,
  additionalInfo: any
): "opcion_2" | "opcion_4" => {
  const ages: number[] = [];

  // Agregar edad del prospecto principal
  if (prospect?.age) {
    ages.push(prospect.age);
  }

  // Agregar edad de la pareja si existe
  if (additionalInfo?.partnerAge) {
    ages.push(additionalInfo.partnerAge);
  }

  // Agregar edades de los hijos si existen
  if (additionalInfo?.children && Array.isArray(additionalInfo.children)) {
    additionalInfo.children.forEach((child: any) => {
      if (child?.age) {
        ages.push(child.age);
      }
    });
  }

  // Agregar edades de los padres si existen
  if (additionalInfo?.momAge) {
    ages.push(additionalInfo.momAge);
  }
  if (additionalInfo?.dadAge) {
    ages.push(additionalInfo.dadAge);
  }

  // Agregar edades de otras personas protegidas si existen
  if (
    additionalInfo?.protectedPersons &&
    Array.isArray(additionalInfo.protectedPersons)
  ) {
    additionalInfo.protectedPersons.forEach((person: any) => {
      if (person?.age) {
        ages.push(person.age);
      }
    });
  }

  // Si la persona más joven (edad mínima) tiene menos de 45, usar opcion_2
  // Si la persona más joven tiene 45 años o más, usar opcion_4
  const minAge = Math.min(...ages);

  return minAge >= 45 ? "opcion_4" : "opcion_2";
};

/**
 * Obtiene el valor apropiado de una estructura con opciones múltiples basado en las edades
 * Funciona para deducibles, coaseguro y tope de coaseguro
 */
export const getValueByAge = (
  data: any,
  prospect: any,
  additionalInfo: any,
  level: "A" | "B" | "C" | "D" = "A"
): number => {
  if (!data) return 0;

  // Si es un valor simple (número), retornarlo
  if (typeof data === "number") {
    return data;
  }

  // Si tiene una propiedad 'value', usarla
  if (data.value !== undefined) {
    return data.value;
  }

  // Si no tiene opciones múltiples, retornar 0
  if (!data.opcion_2 && !data.opcion_4) {
    return 0;
  }

  // Determinar qué opción usar basándose en las edades
  const option = getAgeBasedOption(prospect, additionalInfo);
  const selectedOption = data[option];

  if (!selectedOption) {
    return 0;
  }

  // Retornar el valor del nivel especificado
  return selectedOption[level] || 0;
};

/**
 * Obtiene el valor mínimo de una estructura con opciones múltiples basado en las edades
 * Útil para mostrar "desde" en la UI
 */
export const getMinimumValueByAge = (
  data: any,
  prospect: any,
  additionalInfo: any
): number => {
  if (!data) return 0;

  // Si es un valor simple (número), retornarlo
  if (typeof data === "number") {
    return data;
  }

  // Si tiene una propiedad 'value', usarla
  if (data.value !== undefined) {
    return data.value;
  }

  // Si no tiene opciones múltiples, retornar 0
  if (!data.opcion_2 && !data.opcion_4) {
    return 0;
  }

  // Determinar qué opción usar basándose en las edades
  const option = getAgeBasedOption(prospect, additionalInfo);
  const selectedOption = data[option];

  if (!selectedOption) {
    return 0;
  }

  // Retornar el valor mínimo de todos los niveles
  const values = Object.values(selectedOption) as number[];
  const minValue = values.length > 0 ? Math.min(...values) : 0;

  // Debug temporal - mostrar lógica de selección
  const ages: number[] = [];
  if (prospect?.age) ages.push(prospect.age);
  if (additionalInfo?.partnerAge) ages.push(additionalInfo.partnerAge);
  if (additionalInfo?.children) {
    additionalInfo.children.forEach((child: any) => {
      if (child?.age) ages.push(child.age);
    });
  }

  return minValue;
};
