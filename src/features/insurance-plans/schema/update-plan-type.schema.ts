import { z } from "zod";

export const updatePlanTypeSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  id: z.string(),
});
