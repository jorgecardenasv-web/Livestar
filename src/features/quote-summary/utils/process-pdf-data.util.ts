import { InsuranceQuoteData, QuotePDFData } from "../types";

export const processPDFData = (
  data: InsuranceQuoteData,
  prospect?: any
): QuotePDFData => {
  const members = [];
  let hasDetailedPricing = false;
  let totalAnual = 0;
  let totalPrimerMes = 0;
  let totalSegundoMesADoce = 0;

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
  if (
    data.individualPricesJson &&
    individualPrices?.main?.anual !== undefined
  ) {
    try {
      const mainMember = {
        type: "Titular",
        price: individualPrices.main.anual,
        anual: individualPrices.main.anual,
        primerMes: individualPrices.main.primerMes,
        segundoMesADoce: individualPrices.main.segundoMesADoce,
        age: prospect?.prospect?.age,
      };
      totalAnual += individualPrices.main.anual;
      totalPrimerMes += individualPrices.main.primerMes;
      totalSegundoMesADoce += individualPrices.main.segundoMesADoce;
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
        totalAnual += individualPrices.partner.anual;
        totalPrimerMes += individualPrices.partner.primerMes;
        totalSegundoMesADoce += individualPrices.partner.segundoMesADoce;
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
          totalAnual += child.anual;
          totalPrimerMes += child.primerMes;
          totalSegundoMesADoce += child.segundoMesADoce;
          members.push(childMember);
        });
      }

      hasDetailedPricing = true;
    } catch (error) {
      console.error("Error processing HDI prices:", error);
      hasDetailedPricing = false;
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
        let individualPrice = 0;
        switch (memberType) {
          case "main":
            individualPrice = ensureValidNumber(individualPrices.main);
            break;
          case "partner":
            individualPrice = ensureValidNumber(individualPrices.partner);
            break;
          case "children":
            individualPrice = ensureValidNumber(
              individualPrices.children?.[index || 0]
            );
            break;
          case "parents":
            individualPrice = ensureValidNumber(
              individualPrices.parents?.[index || 0]
            );
            break;
          case "others":
            individualPrice = ensureValidNumber(
              individualPrices.others?.[index || 0]
            );
            break;
        }
        monthlyPrice = individualPrice;
        yearlyPrice = monthlyPrice * 12;
      }

      members.push({
        type,
        price: monthlyPrice,
        age: ensureValidNumber(age),
        anual: yearlyPrice,
        primerMes: monthlyPrice,
        segundoMesADoce: monthlyPrice,
      });
      totalAnual += yearlyPrice;
      totalPrimerMes += monthlyPrice;
      totalSegundoMesADoce += monthlyPrice;
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
            price: prices.main,
            age: prices.mainAge || undefined,
          });
        }

        if (prices.partner && !prices.partner.anual) {
          members.push({
            type: "Pareja",
            price: prices.partner,
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
                price: childPrice,
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
                price: parent.price,
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
                price: other.price,
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

  if (!hasDetailedPricing) {
    const totalMensual = members.reduce((sum, m) => sum + m.price, 0);
    totalAnual = totalMensual * 12;

    totalPrimerMes = totalMensual;
    totalSegundoMesADoce = totalMensual;
  }

  return {
    company: data.company,
    plan: data.plan,
    coverageFee: hasDetailedPricing ? data.coverage_fee : defaultMonthlyPrice,
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
    contractorName: prospect?.prospect?.name || "",
    postalCode: prospect?.prospect?.postalCode || "",
    hasDetailedPricing,
    individualPricesJson: data.individualPricesJson,
    totalAnual,
    totalPrimerMes,
    totalSegundoMesADoce,
  };
};
