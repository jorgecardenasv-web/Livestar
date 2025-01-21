import { getAdvisorsService } from "@/features/advisors/services/get-advisors.service";
import { Advisor } from "@/features/advisors/types/advisor";

export const getAdvisors = async (): Promise<Advisor[]> => {
  const advisors = await getAdvisorsService();

  return advisors.map((advisor) => ({
    ...advisor,
    id: advisor.id,
  }));
};