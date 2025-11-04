import prisma from "@/lib/prisma";

interface CreateQuoteParams {
  prospectData: any;
  medicalData?: any;
  plan: {
    id: string;
    company: string;
    plan: string;
    coverage_fee: number | string;
    paymentType: string;
    sumInsured: number | string;
    deductible: number | string;
    coInsurance: number | string;
    coInsuranceCap: number | string;
    individualPricesJson?: string;
    isMultipleString?: string;
    deductiblesJson?: string;
    isMultipleCoInsurance?: string;
    coInsuranceJson?: string;
    coInsuranceCapJson?: string;
    companyId?: string;
    companyLogo?: string;
    planTypeId?: string;
    planTypeName?: string;
    prices?: any;
    deductibles?: any;
    isRecommended?: boolean;
  };
}

export const createQuoteService = async (
  { prospectData, medicalData, plan }: CreateQuoteParams,
  advisorId: string
) => {
  const {
    name,
    gender,
    postalCode,
    protectWho,
    whatsapp,
    email,
    age,
    ...additionalInfo
  } = prospectData;

  const prospect = await prisma.prospect.create({
    data: {
      name,
      gender,
      postalCode,
      whatsapp,
      email,
      age,
    },
  });

  const membersData = plan.individualPricesJson
    ? JSON.parse(plan.individualPricesJson)
    : null;
  const deductiblesData = plan.deductiblesJson
    ? JSON.parse(plan.deductiblesJson)
    : null;

  const planData = {
    id: plan.id,
    companyId: plan.companyId,
    companyName: plan.company,
    companyLogo: plan.companyLogo,
    planTypeId: plan.planTypeId,
    planTypeName: plan.planTypeName || plan.plan,
    sumInsured: parseFloat(plan.sumInsured.toString()),
    coInsurance: parseFloat(plan.coInsurance.toString()),
    coInsuranceCap: parseFloat(plan.coInsuranceCap.toString()),
    prices:
      plan.prices ||
      (plan.individualPricesJson
        ? JSON.parse(plan.individualPricesJson)
        : null),
    deductibles:
      plan.deductibles ||
      (plan.deductiblesJson ? JSON.parse(plan.deductiblesJson) : null),
    isRecommended: plan.isRecommended || false,
    paymentType: plan.paymentType,
    coverageFee: parseFloat(plan.coverage_fee.toString()),
  };

  // Preparar datos de coaseguro múltiple
  let coInsuranceData;
  let coInsuranceCapData;

  if (plan.isMultipleCoInsurance === "true" && plan.coInsuranceJson) {
    try {
      coInsuranceData = JSON.parse(plan.coInsuranceJson);
    } catch (e) {
      console.error("Error parsing coInsuranceJson:", e);
    }
  }

  if (plan.isMultipleCoInsurance === "true" && plan.coInsuranceCapJson) {
    try {
      coInsuranceCapData = JSON.parse(plan.coInsuranceCapJson);
    } catch (e) {
      console.error("Error parsing coInsuranceCapJson:", e);
    }
  }

  const quoteData = {
    prospectId: prospect.id,
    planData: planData,
    totalPrice: parseFloat(plan.coverage_fee.toString()),
    protectWho,
    medicalHistories: medicalData ?? "[{ set: [] }]", //
    userId: advisorId,
    coverageFee: parseFloat(plan.coverage_fee.toString()),
    paymentType: plan.paymentType,
    sumInsured: parseFloat(plan.sumInsured.toString()),
    deductible: parseFloat(plan.deductible.toString()),
    coInsurance: parseFloat(plan.coInsurance.toString()),
    coInsuranceCap: parseFloat(plan.coInsuranceCap.toString()),
    membersData: membersData,
    isMultipleDeductible: plan.isMultipleString === "true",
    deductiblesData: deductiblesData,
    isMultipleCoInsurance: plan.isMultipleCoInsurance === "true",
    coInsuranceData: coInsuranceData,
    coInsuranceCapData: coInsuranceCapData,
    additionalInfo,
  };

  try {
    return await prisma.quote.create({
      data: quoteData,
    });
  } catch (error) {
    // @ts-ignore
    console.error(`Prisma error: ${error.stack}`);
  }
};
