import { GetPlansService } from "../services/index.services";
import { InsurancePlanTransformer } from "../transformers/insurance-plan";

export const getPlans = async () => {
  const resp = await GetPlansService({});

  return {
    ...resp,
    plans: resp.plans.map(InsurancePlanTransformer),
  };
};
