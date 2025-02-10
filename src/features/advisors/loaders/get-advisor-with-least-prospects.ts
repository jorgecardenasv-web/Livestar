import { getAdvisorWithLeastQuotesService } from "../services/get-advisor-with-least-prospects.service";

export const getAdvisorWithLeastProspects = async () => {
  return await getAdvisorWithLeastQuotesService();
};
