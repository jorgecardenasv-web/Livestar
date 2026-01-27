import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El nombre es requerido."
          : "El nombre debe ser un string.",
    })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
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
});
