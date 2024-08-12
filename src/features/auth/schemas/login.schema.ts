import { emailValidation } from "@/shared/utils/validations";
import { z } from "zod";

export const signinSchema = z.object({
  email: emailValidation,
  password: z
    .string()
    .trim()
    .min(6)
    .max(32),
});