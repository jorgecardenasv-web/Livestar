import { getAdvisorWithLeastProspectsService } from "../services/get-advisor-with-least-prospects.service";

export const getAdvisorWithLeastProspects = async () => {
  return await getAdvisorWithLeastProspectsService();
};
