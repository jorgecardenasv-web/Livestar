import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un string",
  }).trim().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser un string",
    })
    .trim()
    .email({
      message: "escribe un correo electrónico valido",
    }),
})