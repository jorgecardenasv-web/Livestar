import { GetPlansService } from "../services/index.services";

export const getPlans = async () => {
  return await GetPlansService();
};
