import { InsuranceQuoteData, QuotePDFData } from "../types";

export const processPDFData = (
  data: InsuranceQuoteData,
  prospect?: any
): QuotePDFData => {
  console.log("Procesando datos del PDF:", data);
  console.log("Datos del prospecto:", prospect);
  const members = [];
  let hasDetailedPricing = false;
  let totalAnual = 0;
  let totalPrimerMes = 0;
  let totalSegundoMesADoce = 0;

  // Primero procesamos los precios si existen
  if (data.individualPricesJson) {
    const prices = JSON.parse(data.individualPricesJson);
    console.log("Precios parseados:", prices);

    if (prices.main?.anual !== undefined) {
      // Estructura de precios detallada (HDI)
      hasDetailedPricing = true;
      const mainMember = {
        type: "Titular",
        price: prices.main.anual,
        anual: prices.main.anual,
        primerMes: prices.main.primerMes,
        segundoMesADoce: prices.main.segundoMesADoce,
        age: prospect?.prospect?.age,
      };
      totalAnual += prices.main.anual;
      totalPrimerMes += prices.main.primerMes;
      totalSegundoMesADoce += prices.main.segundoMesADoce;
      members.push(mainMember);

      if (prices.partner) {
        const partnerMember = {
          type: "Pareja",
          price: prices.partner.anual,
          anual: prices.partner.anual,
          primerMes: prices.partner.primerMes,
          segundoMesADoce: prices.partner.segundoMesADoce,
          age: prospect?.additionalInfo?.partnerAge,
        };
        totalAnual += prices.partner.anual;
        totalPrimerMes += prices.partner.primerMes;
        totalSegundoMesADoce += prices.partner.segundoMesADoce;
        members.push(partnerMember);
      }

      if (prices.children?.length) {
        prices.children.forEach((child: any, index: number) => {
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

      return {
        company: data.company,
        plan: data.plan,
        coverageFee: data.coverage_fee,
        paymentType: data.paymentType,
        sumInsured: data.sumInsured,
        deductible: data.deductible,
        coInsurance: data.coInsurance,
        coInsuranceCap: data.coInsuranceCap,
        members,
        isMultipleDeductible: data.isMultipleString === "true",
        deductibles: data.deductiblesJson
          ? JSON.parse(data.deductiblesJson)
          : undefined,
        contractorName: prospect?.prospect?.name || "",
        postalCode: prospect?.prospect?.postalCode || "",
        hasDetailedPricing: true,
        individualPricesJson: data.individualPricesJson,
        totalAnual,
        totalPrimerMes,
        totalSegundoMesADoce,
      };
    }
  }

  // Si no hay precios detallados o son precios simples, usamos la lógica tradicional
  if (prospect) {
    console.log("Datos del prospecto:", JSON.stringify(prospect, null, 2));
    console.log("Tipo de protección:", prospect.protectWho);

    // Caso mis_padres
    if (prospect.protectWho === "mis_padres" && prospect.additionalInfo) {
      if (prospect.additionalInfo.dadAge) {
        members.push({
          type: "Padre",
          price: data.coverage_fee,
          age: prospect.additionalInfo.dadAge,
        });
      }
      if (prospect.additionalInfo.momAge) {
        members.push({
          type: "Madre",
          price: data.coverage_fee,
          age: prospect.additionalInfo.momAge,
        });
      }
    }
    // Caso solo_mis_hijos
    else if (
      prospect.protectWho === "solo_mis_hijos" &&
      prospect.additionalInfo?.children
    ) {
      prospect.additionalInfo.children.forEach((child: any, index: number) => {
        members.push({
          type: `Hijo/a ${index + 1}`,
          price: data.coverage_fee,
          age: child.age,
        });
      });
    }
    // Casos que incluyen al titular
    else {
      // Agregar titular en todos los casos excepto mis_padres y solo_mis_hijos
      members.push({
        type: "Titular",
        price: data.coverage_fee,
        age: prospect.prospect.age,
      });

      // Casos con pareja
      if (
        (prospect.protectWho === "familia" ||
          prospect.protectWho === "mi_pareja_y_yo") &&
        prospect.additionalInfo?.partnerAge
      ) {
        members.push({
          type: "Pareja",
          price: data.coverage_fee,
          age: prospect.additionalInfo.partnerAge,
        });
      }

      // Casos con hijos
      if (
        (prospect.protectWho === "familia" ||
          prospect.protectWho === "mis_hijos_y_yo") &&
        prospect.additionalInfo?.children
      ) {
        prospect.additionalInfo.children.forEach(
          (child: any, index: number) => {
            members.push({
              type: `Hijo/a ${index + 1}`,
              price: data.coverage_fee,
              age: child.age,
            });
          }
        );
      }

      // Caso otros
      if (
        prospect.protectWho === "otros" &&
        prospect.additionalInfo?.protectedPersons
      ) {
        prospect.additionalInfo.protectedPersons.forEach((person: any) => {
          members.push({
            type: person.relationship || "Otro",
            price: data.coverage_fee,
            age: person.age,
          });
        });
      }
    }
  } else if (data.individualPricesJson) {
    // Fallback usando individualPricesJson
    const prices = JSON.parse(data.individualPricesJson);

    if (prices.main) {
      members.push({
        type: "Titular",
        price: prices.main,
        age: prices.mainAge || undefined,
      });
    }

    if (prices.partner) {
      members.push({
        type: "Pareja",
        price: prices.partner,
        age: prices.partnerAge || undefined,
      });
    }

    if (prices.children) {
      prices.children.forEach(
        (price: number | { price: number; age: number }, index: number) => {
          const childPrice = typeof price === "number" ? price : price.price;
          const childAge = typeof price === "number" ? undefined : price.age;
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
  }

  // Calcular los totales para precios no detallados
  if (!hasDetailedPricing) {
    const totalMensual = members.reduce((sum, m) => sum + m.price, 0);
    totalAnual = totalMensual * 12;
    // Para precios no detallados, el primer mes y los meses subsiguientes son iguales
    totalPrimerMes = totalMensual;
    totalSegundoMesADoce = totalMensual;
  }

  return {
    company: data.company,
    plan: data.plan,
    coverageFee: data.coverage_fee,
    paymentType: data.paymentType,
    sumInsured: data.sumInsured,
    deductible: data.deductible,
    coInsurance: data.coInsurance,
    coInsuranceCap: data.coInsuranceCap,
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
