import { emailValidation } from "@/shared/utils/validations";
import { z } from "zod";

export const editAdvisorSchema = z.object({
  email: emailValidation,
  name: z
    .string()
    .trim()
    .min(1, {
      message: "El nombre debe tener al menos un carácter.",
    })
    .max(32, {
      message: "El nombre debe tener como máximo 32 caracteres.",
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: "El nombre solo puede contener letras y espacios.",
    }),
});
