import { InsuranceQuoteData, QuotePDFData } from "../types";

// Utility function to calculate total annual price from individualPricesJson
const calculateTotalAnnualPrice = (individualPricesJson: string): number => {
  try {
    const prices = JSON.parse(individualPricesJson);
    let total = 0;

    // Add main price
    if (prices.main?.anual) {
      total += prices.main.anual;
    }

    // Add partner price
    if (prices.partner?.anual) {
      total += prices.partner.anual;
    }

    // Add children prices
    if (Array.isArray(prices.children)) {
      prices.children.forEach((child: any) => {
        if (child?.anual) {
          total += child.anual;
        }
      });
    }

    // Add parents prices
    if (Array.isArray(prices.parents)) {
      prices.parents.forEach((parent: any) => {
        if (parent?.anual) {
          total += parent.anual;
        }
      });
    }

    // Add others prices
    if (Array.isArray(prices.others)) {
      prices.others.forEach((other: any) => {
        if (other?.anual) {
          total += other.anual;
        }
      });
    }

    return total;
  } catch (error) {
    console.error("Error calculating total annual price:", error);
    return 0;
  }
};

// Utility function to calculate total primer mes from individualPricesJson
const calculateTotalPrimerMes = (
  individualPricesJson: string
): number | null => {
  try {
    const prices = JSON.parse(individualPricesJson);
    let total = 0;
    let hasAnyPrimerMes = false;

    // Check main price
    if (prices.main?.primerMes !== undefined) {
      total += prices.main.primerMes;
      hasAnyPrimerMes = true;
    }

    // Check partner price
    if (prices.partner?.primerMes !== undefined) {
      total += prices.partner.primerMes;
      hasAnyPrimerMes = true;
    }

    // Check children prices
    if (Array.isArray(prices.children)) {
      prices.children.forEach((child: any) => {
        if (child?.primerMes !== undefined) {
          total += child.primerMes;
          hasAnyPrimerMes = true;
        }
      });
    }

    // Check parents prices
    if (Array.isArray(prices.parents)) {
      prices.parents.forEach((parent: any) => {
        if (parent?.primerMes !== undefined) {
          total += parent.primerMes;
          hasAnyPrimerMes = true;
        }
      });
    }

    // Check others prices
    if (Array.isArray(prices.others)) {
      prices.others.forEach((other: any) => {
        if (other?.primerMes !== undefined) {
          total += other.primerMes;
          hasAnyPrimerMes = true;
        }
      });
    }

    return hasAnyPrimerMes ? total : null;
  } catch (error) {
    console.error("Error calculating total primer mes:", error);
    return null;
  }
};

// Utility function to calculate total segundo mes a doce from individualPricesJson
const calculateTotalSegundoMesADoce = (
  individualPricesJson: string
): number | null => {
  try {
    const prices = JSON.parse(individualPricesJson);
    let total = 0;
    let hasAnySegundoMesADoce = false;

    // Check main price
    if (prices.main?.segundoMesADoce !== undefined) {
      total += prices.main.segundoMesADoce;
      hasAnySegundoMesADoce = true;
    }

    // Check partner price
    if (prices.partner?.segundoMesADoce !== undefined) {
      total += prices.partner.segundoMesADoce;
      hasAnySegundoMesADoce = true;
    }

    // Check children prices
    if (Array.isArray(prices.children)) {
      prices.children.forEach((child: any) => {
        if (child?.segundoMesADoce !== undefined) {
          total += child.segundoMesADoce;
          hasAnySegundoMesADoce = true;
        }
      });
    }

    // Check parents prices
    if (Array.isArray(prices.parents)) {
      prices.parents.forEach((parent: any) => {
        if (parent?.segundoMesADoce !== undefined) {
          total += parent.segundoMesADoce;
          hasAnySegundoMesADoce = true;
        }
      });
    }

    // Check others prices
    if (Array.isArray(prices.others)) {
      prices.others.forEach((other: any) => {
        if (other?.segundoMesADoce !== undefined) {
          total += other.segundoMesADoce;
          hasAnySegundoMesADoce = true;
        }
      });
    }

    return hasAnySegundoMesADoce ? total : null;
  } catch (error) {
    console.error("Error calculating total segundo mes a doce:", error);
    return null;
  }
};

// Utility function to calculate total mensual from individualPricesJson
const calculateTotalMensual = (individualPricesJson: string): number | null => {
  try {
    const prices = JSON.parse(individualPricesJson);
    let total = 0;
    let hasAnyMensual = false;

    // Check main price
    if (prices.main?.mensual !== undefined) {
      total += prices.main.mensual;
      hasAnyMensual = true;
    }

    // Check partner price
    if (prices.partner?.mensual !== undefined) {
      total += prices.partner.mensual;
      hasAnyMensual = true;
    }

    // Check children prices
    if (Array.isArray(prices.children)) {
      prices.children.forEach((child: any) => {
        if (child?.mensual !== undefined) {
          total += child.mensual;
          hasAnyMensual = true;
        }
      });
    }

    // Check parents prices
    if (Array.isArray(prices.parents)) {
      prices.parents.forEach((parent: any) => {
        if (parent?.mensual !== undefined) {
          total += parent.mensual;
          hasAnyMensual = true;
        }
      });
    }

    // Check others prices
    if (Array.isArray(prices.others)) {
      prices.others.forEach((other: any) => {
        if (other?.mensual !== undefined) {
          total += other.mensual;
          hasAnyMensual = true;
        }
      });
    }

    return hasAnyMensual ? total : null;
  } catch (error) {
    console.error("Error calculating total mensual:", error);
    return null;
  }
};

// Utility function to determine if individualPricesJson has detailed pricing (HDI structure)
export const hasDetailedPricingStructure = (
  individualPricesJson: string | null | undefined
): boolean => {
  if (!individualPricesJson) {
    return false;
  }

  try {
    const prices = JSON.parse(individualPricesJson);

    if (
      !prices ||
      typeof prices !== "object" ||
      Object.keys(prices).length === 0
    ) {
      return false;
    }

    // Check if main member has detailed pricing structure
    const mainPrices = prices.main;
    return (
      typeof mainPrices === "object" &&
      mainPrices !== null &&
      "anual" in mainPrices &&
      "primerMes" in mainPrices &&
      "segundoMesADoce" in mainPrices
    );
  } catch (error) {
    console.error("Error parsing individualPricesJson:", error);
    return false;
  }
};

export const processPDFData = (
  data: InsuranceQuoteData,
  prospect?: any
): QuotePDFData => {
  const members = [];
  const hasDetailedPricing = hasDetailedPricingStructure(
    data.individualPricesJson
  );
  let totalPrimerMes = 0;
  let totalSegundoMesADoce = 0;

  // Calculate totals from individualPricesJson (sum of all members' prices)
  const calculatedTotalAnual = data.individualPricesJson
    ? calculateTotalAnnualPrice(data.individualPricesJson)
    : 0;
  const calculatedTotalPrimerMes = data.individualPricesJson
    ? calculateTotalPrimerMes(data.individualPricesJson)
    : null;
  const calculatedTotalSegundoMesADoce = data.individualPricesJson
    ? calculateTotalSegundoMesADoce(data.individualPricesJson)
    : null;
  const calculatedTotalMensual = data.individualPricesJson
    ? calculateTotalMensual(data.individualPricesJson)
    : null;

  // Use the calculated totals
  let totalAnual = calculatedTotalAnual;
  totalPrimerMes = calculatedTotalPrimerMes ?? 0;
  totalSegundoMesADoce = calculatedTotalSegundoMesADoce ?? 0;
  const totalMensual = calculatedTotalMensual ?? 0;

  // Función helper para asegurar que tengamos números válidos
  const ensureValidNumber = (value: any): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Procesar precios individuales si existen
  let individualPrices: any = null;
  if (data.individualPricesJson) {
    try {
      individualPrices = JSON.parse(data.individualPricesJson);
    } catch (error) {
      console.error("Error parsing individualPricesJson:", error);
    }
  }

  // Convertir el coverage_fee a número y calcular los precios base
  const defaultMonthlyPrice = ensureValidNumber(data.coverage_fee);
  const defaultYearlyPrice = defaultMonthlyPrice * 12;

  // Si tenemos precios detallados (HDI)
  if (hasDetailedPricing) {
    try {
      const mainMember = {
        type: "Titular",
        price: individualPrices.main.anual,
        anual: individualPrices.main.anual,
        primerMes: individualPrices.main.primerMes,
        segundoMesADoce: individualPrices.main.segundoMesADoce,
        age: prospect?.prospect?.age,
      };
      // totals will be calculated from utility functions
      members.push(mainMember);

      if (individualPrices.partner) {
        const partnerMember = {
          type: "Pareja",
          price: individualPrices.partner.anual,
          anual: individualPrices.partner.anual,
          primerMes: individualPrices.partner.primerMes,
          segundoMesADoce: individualPrices.partner.segundoMesADoce,
          age: prospect?.additionalInfo?.partnerAge,
        };
        // totals will be calculated from utility functions
        members.push(partnerMember);
      }

      if (individualPrices.children?.length) {
        individualPrices.children.forEach((child: any, index: number) => {
          const childMember = {
            type: `Hijo/a ${index + 1}`,
            price: child.anual,
            anual: child.anual,
            primerMes: child.primerMes,
            segundoMesADoce: child.segundoMesADoce,
            age: prospect?.additionalInfo?.children?.[index]?.age,
          };
          // totals will be calculated from utility functions
          members.push(childMember);
        });
      }
    } catch (error) {
      console.error("Error processing HDI prices:", error);
    }
  }

  // Procesar miembros cuando no hay precios detallados (GNP)
  if (!hasDetailedPricing && prospect) {
    const addMember = (
      type: string,
      age: any,
      memberType: "main" | "partner" | "children" | "parents" | "others",
      index?: number
    ) => {
      let monthlyPrice = defaultMonthlyPrice;
      let yearlyPrice = defaultYearlyPrice;

      // Si hay precios individuales, usarlos
      if (individualPrices) {
        let individualMensual = 0;
        let individualAnual = 0;
        switch (memberType) {
          case "main":
            individualMensual = ensureValidNumber(
              individualPrices.main?.mensual
            );
            individualAnual = ensureValidNumber(individualPrices.main?.anual);
            break;
          case "partner":
            individualMensual = ensureValidNumber(
              individualPrices.partner?.mensual
            );
            individualAnual = ensureValidNumber(
              individualPrices.partner?.anual
            );
            break;
          case "children":
            individualMensual = ensureValidNumber(
              individualPrices.children?.[index || 0]?.mensual
            );
            individualAnual = ensureValidNumber(
              individualPrices.children?.[index || 0]?.anual
            );
            break;
          case "parents":
            individualMensual = ensureValidNumber(
              individualPrices.parents?.[index || 0]?.mensual
            );
            individualAnual = ensureValidNumber(
              individualPrices.parents?.[index || 0]?.anual
            );
            break;
          case "others":
            individualMensual = ensureValidNumber(
              individualPrices.others?.[index || 0]?.mensual
            );
            individualAnual = ensureValidNumber(
              individualPrices.others?.[index || 0]?.anual
            );
            break;
        }
        monthlyPrice = individualMensual;
        yearlyPrice = individualAnual;
      }

      members.push({
        type,
        price: monthlyPrice,
        age: ensureValidNumber(age),
        anual: yearlyPrice,
        primerMes: monthlyPrice,
        segundoMesADoce: monthlyPrice,
      });
      // totals will be calculated from utility functions or accumulated for non-detailed pricing
    };

    if (prospect.protectWho === "mis_padres" && prospect.additionalInfo) {
      if (prospect.additionalInfo.dadAge) {
        addMember("Padre", prospect.additionalInfo.dadAge, "parents", 0);
      }
      if (prospect.additionalInfo.momAge) {
        addMember("Madre", prospect.additionalInfo.momAge, "parents", 1);
      }
    } else if (
      prospect.protectWho === "solo_mis_hijos" &&
      prospect.additionalInfo?.children
    ) {
      prospect.additionalInfo.children.forEach((child: any, index: number) => {
        addMember(`Hijo/a ${index + 1}`, child.age, "children", index);
      });
    } else {
      if (prospect.prospect?.age) {
        addMember("Titular", prospect.prospect.age, "main");
      }

      if (
        (prospect.protectWho === "familia" ||
          prospect.protectWho === "mi_pareja_y_yo") &&
        prospect.additionalInfo?.partnerAge
      ) {
        addMember("Pareja", prospect.additionalInfo.partnerAge, "partner");
      }

      if (
        (prospect.protectWho === "familia" ||
          prospect.protectWho === "mis_hijos_y_yo") &&
        prospect.additionalInfo?.children
      ) {
        prospect.additionalInfo.children.forEach(
          (child: any, index: number) => {
            addMember(`Hijo/a ${index + 1}`, child.age, "children", index);
          }
        );
      }
    }

    if (
      prospect.protectWho === "otros" &&
      prospect.additionalInfo?.protectedPersons
    ) {
      prospect.additionalInfo.protectedPersons.forEach(
        (person: any, index: number) => {
          addMember(person.relationship || "Otro", person.age, "others", index);
        }
      );
    }
  } else if (!hasDetailedPricing) {
    // Solo procesar si no se han procesado los precios detallados antes
    if (data.individualPricesJson) {
      try {
        const prices = JSON.parse(data.individualPricesJson);

        // Procesar precios solo si no son del formato HDI (con anual, primerMes, etc.)
        if (prices.main && !prices.main.anual) {
          members.push({
            type: "Titular",
            price: ensureValidNumber(prices.main),
            anual: ensureValidNumber(prices.main * 12),
            age: prices.mainAge || undefined,
          });
        }

        if (prices.partner && !prices.partner.anual) {
          members.push({
            type: "Pareja",
            price: ensureValidNumber(prices.partner),
            anual: ensureValidNumber(prices.partner * 12),
            age: prices.partnerAge || undefined,
          });
        }

        if (prices.children && !prices.children[0]?.anual) {
          prices.children.forEach(
            (price: number | { price: number; age: number }, index: number) => {
              const childPrice =
                typeof price === "number" ? price : price.price;
              const childAge =
                typeof price === "number" ? undefined : price.age;
              members.push({
                type: `Hijo/a ${index + 1}`,
                price: ensureValidNumber(childPrice),
                anual: ensureValidNumber(childPrice * 12),
                age: childAge,
              });
            }
          );
        }

        if (prices.parents) {
          prices.parents.forEach(
            (parent: { name: string; price: number; age?: number }) => {
              members.push({
                type: parent.name === "Padre" ? "Padre" : "Madre",
                price: ensureValidNumber(parent.price),
                anual: ensureValidNumber(parent.price * 12),
                age: parent.age,
              });
            }
          );
        }

        if (prices.others) {
          prices.others.forEach(
            (other: { relationship: string; price: number; age?: number }) => {
              members.push({
                type: other.relationship || "Otro",
                price: ensureValidNumber(other.price),
                anual: ensureValidNumber(other.price * 12),
                age: other.age,
              });
            }
          );
        }
      } catch (error) {
        console.error("Error processing non-HDI individual prices:", error);
      }
    }
  }

  // Set final totals based on whether we have detailed pricing or not
  if (!hasDetailedPricing) {
    const totalMensual = members.reduce((sum, m) => sum + m.price, 0);
    totalPrimerMes = totalMensual;
    totalSegundoMesADoce = totalMensual;
  }

  return {
    company: data.company,
    plan: data.plan,
    paymentType: data.paymentType,
    sumInsured: ensureValidNumber(data.sumInsured),
    deductible: ensureValidNumber(data.deductible),
    coInsurance: ensureValidNumber(data.coInsurance),
    coInsuranceCap: ensureValidNumber(data.coInsuranceCap),
    members,
    isMultipleDeductible: data.isMultipleString === "true",
    deductibles: data.deductiblesJson
      ? JSON.parse(data.deductiblesJson)
      : undefined,
    isMultipleCoInsurance: data.isMultipleCoInsurance === "true",
    coInsuranceData: data.coInsuranceJson
      ? JSON.parse(data.coInsuranceJson)
      : undefined,
    coInsuranceCapData: data.coInsuranceCapJson
      ? JSON.parse(data.coInsuranceCapJson)
      : undefined,
    contractorName: prospect?.prospect?.name || "",
    postalCode: prospect?.prospect?.postalCode || "",
    hasDetailedPricing,
    individualPricesJson: data.individualPricesJson,
    totalAnual,
    totalPrimerMes,
    totalSegundoMesADoce,
    totalMensual,
  };
};
