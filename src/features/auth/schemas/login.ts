import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El email es requerido."
          : "El email debe ser un string.",
    })
    .trim()
    .email({
      message: "Escribe un correo electrónico válido.",
    }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    })
    .max(32, {
      message: "La contraseña debe tener como máximo 32 caracteres.",
    }),
});
