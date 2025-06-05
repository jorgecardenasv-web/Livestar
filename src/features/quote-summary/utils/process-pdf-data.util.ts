import { InsuranceQuoteData, QuotePDFData } from "../types";

export const processPDFData = (
  data: InsuranceQuoteData,
  prospect?: any
): QuotePDFData => {
  console.log("Procesando datos del PDF:", data);
  console.log("Datos del prospecto:", prospect);
  const members = [];

  // Si tenemos datos del prospecto, los usamos para los miembros
  if (prospect) {
    console.log(
      "Datos completos del prospecto:",
      JSON.stringify(prospect, null, 2)
    );
    console.log("Tipo de protección:", prospect.protectWho);
    console.log("Información adicional:", prospect.additionalInfo);

    members.push({
      type: "Titular",
      price: data.coverage_fee,
      age: prospect.prospect.age,
    });

    // Agregar datos de pareja para "familia" o "mi_pareja_y_yo"
    if (
      (prospect.protectWho === "familia" ||
        prospect.protectWho === "mi_pareja_y_yo") &&
      prospect.additionalInfo
    ) {
      console.log(
        `Detectado protectWho: ${prospect.protectWho}, intentando agregar pareja...`
      );
      if (prospect.additionalInfo.partnerAge) {
        members.push({
          type: "Pareja",
          price: data.coverage_fee,
          age: prospect.additionalInfo.partnerAge,
        });
      }

      // Para "familia", también agregar los hijos
      if (
        prospect.protectWho === "familia" &&
        prospect.additionalInfo.children
      ) {
        prospect.additionalInfo.children.forEach(
          (child: any, index: number) => {
            members.push({
              type: "Hijo/a",
              price: data.coverage_fee,
              age: child.age,
            });
          }
        );
      }
    }
  } else if (data.individualPricesJson) {
    console.log("Usando fallback de individualPricesJson");
    // Fallback al comportamiento anterior si no hay datos del prospecto
    const prices = JSON.parse(data.individualPricesJson);
    console.log("Datos de precios parseados:", prices);
    console.log("protectedWho desde data:", data.protectedWho);
    console.log("Datos de precios individuales:", prices);
    console.log("Tipo de protección:", data.protectedWho);
    if (prices.main)
      members.push({
        type: "Titular",
        price: prices.main,
        age: prices.mainAge || undefined,
      });
    // Agregar pareja si está disponible o si protectedWho es mi_pareja_y_yo
    if (prices.partner || data.protectedWho === "mi_pareja_y_yo")
      members.push({
        type: "Pareja",
        price: prices.partner || prices.main, // Si no hay precio específico, usar el mismo que el titular
        age: prices.partnerAge || undefined,
      });
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
            type: "Padre/Madre",
            name: parent.name,
            price: parent.price,
            age: parent.age,
          });
        }
      );
    }

    // Agregamos logs específicos para la pareja
    console.log(
      "Procesando datos para PDF - Modo de protección:",
      data.protectedWho
    );

    if (data.individualPricesJson) {
      console.log("Datos de precios individuales encontrados");
      const prices = JSON.parse(data.individualPricesJson);
      console.log("Datos de la pareja:", prices.partner);

      if (data.protectedWho === "mi_pareja_y_yo") {
        console.log(
          "Detectado modo mi_pareja_y_yo, verificando datos de la pareja"
        );
      }

      const members: any[] = [];

      // Precio principal
      if (prices.main) {
        members.push({
          type: "Titular",
          price:
            typeof prices.main === "number"
              ? prices.main
              : prices.main.mensual || prices.main.primerMes,
        });
      }

      // Precio de la pareja
      if (prices.partner) {
        console.log("Agregando información de la pareja al PDF");
        members.push({
          type: "Pareja",
          price:
            typeof prices.partner === "number"
              ? prices.partner
              : prices.partner.mensual || prices.partner.primerMes,
        });
      }
    }
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
  };
};
