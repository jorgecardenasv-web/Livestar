import { z } from "zod";

export const emailValidation = z
  .string()
  .trim()
  .email();