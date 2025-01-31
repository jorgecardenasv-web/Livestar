import { z } from "zod";

export const updateInsuranceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
});
