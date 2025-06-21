import { getActivePlansByType } from "../services/read/get-plans-by-type.service";

export const getActivePlansByTypeLoader = async (planTypeId: string) => {
  const plans = await getActivePlansByType(planTypeId);
  return plans;
};
