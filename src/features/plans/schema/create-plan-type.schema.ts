import { z } from "zod";

export const createPlanTypeSchema = z.object({
  name: z.string(),
});
