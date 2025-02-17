import prisma from "@/lib/prisma";

interface CreateQuoteParams {
  prospectData: any;
  medicalData: any;
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

  // Convertir todos los valores numéricos a tipo number
  const quoteData = {
    prospectId: prospect.id,
    planId: plan.id,
    totalPrice: parseFloat(plan.coverage_fee.toString()),
    protectWho,
    medicalHistories: medicalData,
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
    additionalInfo,
  };

  return await prisma.quote.create({
    data: quoteData,
  });
};
