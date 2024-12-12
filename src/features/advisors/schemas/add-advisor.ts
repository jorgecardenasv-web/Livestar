import { emailValidation } from "@/shared/utils/validations";
import { z } from "zod";

export const addAdvisorSchema = z.object({
  email: emailValidation,
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .trim()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    })
    .max(32, {
      message: "La contraseña debe tener como máximo 32 caracteres.",
    }),
  name: z
    .string({
      required_error: "El nombre es requerido.",
    })
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
