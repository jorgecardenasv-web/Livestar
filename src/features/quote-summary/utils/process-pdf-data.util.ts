import { InsuranceQuoteData, QuotePDFData } from "../types";

export const processPDFData = (
  data: InsuranceQuoteData,
  prospect?: any
): QuotePDFData => {
  console.log("Procesando datos del PDF:", data);
  const members = [];

  // Si tenemos datos del prospecto, los usamos para los miembros
  if (prospect) {
    members.push({
      type: "Titular",
      price: data.coverage_fee,
      age: prospect.prospect.age,
    });

    if (prospect.protectWho === "familia" && prospect.additionalInfo) {
      if (prospect.additionalInfo.partnerAge) {
        members.push({
          type: "Pareja",
          price: data.coverage_fee,
          age: prospect.additionalInfo.partnerAge,
        });
      }

      if (prospect.additionalInfo.children) {
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
    // Fallback al comportamiento anterior si no hay datos del prospecto
    const prices = JSON.parse(data.individualPricesJson);
    if (prices.main)
      members.push({
        type: "Titular",
        price: prices.main,
        age: prices.mainAge || undefined,
      });
    if (prices.partner)
      members.push({
        type: "Pareja",
        price: prices.partner,
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
