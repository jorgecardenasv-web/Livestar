import { InsuranceQuoteData } from "@/app/(cliente)/cotizar/page";
import { QuotePDFData } from "../types/pdf";

export const processPDFData = (data: InsuranceQuoteData): QuotePDFData => {
  const members = [];

  if (data.individualPricesJson) {
    const prices = JSON.parse(data.individualPricesJson);
    if (prices.main) members.push({ type: "Titular", price: prices.main });
    if (prices.partner) members.push({ type: "Pareja", price: prices.partner });
    if (prices.children) {
      prices.children.forEach((price: number, index: number) => {
        members.push({ type: `Hijo/a ${index + 1}`, price });
      });
    }
    if (prices.parents) {
      prices.parents.forEach((parent: { name: string; price: number }) => {
        members.push({
          type: "Padre/Madre",
          name: parent.name,
          price: parent.price,
        });
      });
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
  };
};
