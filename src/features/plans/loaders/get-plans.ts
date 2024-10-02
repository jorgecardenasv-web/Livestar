import { GetPlansService } from "../services/index.services";
import { InsurancePlanTransformer } from "../transformers/insurance-plan";

export const getPlans = async () => {
  const plans = await GetPlansService();
  return plans.map(InsurancePlanTransformer);
};
