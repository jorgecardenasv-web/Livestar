import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido.",
      invalid_type_error: "El email debe ser un string.",
    })
    .trim()
    .email({
      message: "Escribe un correo electrónico válido.",
    }),
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
});
