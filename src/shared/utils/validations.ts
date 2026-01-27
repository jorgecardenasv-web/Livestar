import { z } from "zod";

export const emailValidation = z
  .string({
    message: "El email es requerido.",
  })
  .trim()
  .email({
    message: "Escribe un correo electrónico válido.",
  });
