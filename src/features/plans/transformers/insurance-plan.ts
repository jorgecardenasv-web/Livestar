import { Insurance } from "@prisma/client";
import { Plan } from "../types/plan";

export const InsuranceCompanyTransformer = (insuranceCompany: Insurance) => {
  return insuranceCompany;
};

export const InsurancePlanTransformer = (plan: any): Plan => {
  return {
    ...plan,
    // Asegurar que los campos JSON se manejen correctamente
    deductibles:
      typeof plan.deductibles === "string"
        ? JSON.parse(plan.deductibles)
        : plan.deductibles,
    prices:
      typeof plan.prices === "string" ? JSON.parse(plan.prices) : plan.prices,
    coInsurance:
      typeof plan.coInsurance === "string"
        ? JSON.parse(plan.coInsurance)
        : plan.coInsurance,
    coInsuranceCap:
      typeof plan.coInsuranceCap === "string"
        ? JSON.parse(plan.coInsuranceCap)
        : plan.coInsuranceCap,
    // Asegurar que additionalInfoHtml se maneje correctamente (string o null)
    additionalInfoHtml: plan.additionalInfoHtml || null,
  };
};
