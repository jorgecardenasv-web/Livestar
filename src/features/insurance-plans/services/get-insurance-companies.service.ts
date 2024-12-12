import { InsurancePlanTransformer } from "@/features/plans/transformers/insurance-plan";
import prisma from "@/lib/prisma";

export const getInsurancePlansServices = async () => {
  const insurancesPlans = await prisma.insurancePlan.findMany({
    include: {
      company: true,
    },
  });

  return insurancesPlans.map(InsurancePlanTransformer);
};
