import { getAdvisorsService } from "@/features/advisors/services/get-advisors.service";
import { Advisor } from "@/features/advisors/types/advisor";

export const getAdvisors = async (): Promise<Advisor[]> => {
  const { data } = await getAdvisorsService({
    page: "1",
    offset: "100",
  });

  return data.items.map((advisor) => ({
    ...advisor,
    id: advisor.id,
  }));
};
