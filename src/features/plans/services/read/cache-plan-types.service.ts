import { unstable_cache } from "next/cache";
import { getPlanTypes } from "../../loaders/get-plan-types";

export const getCachedPlanTypes = unstable_cache(
  async () => {
    const {
      data: { items: planTypes },
    } = await getPlanTypes({
      page: "1",
      offset: "100",
    });
    return planTypes;
  },
  ["plan-types"],
  {
    revalidate: 3600,
  }
);
