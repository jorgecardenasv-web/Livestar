import { z } from "zod";

export const emailValidation = z
  .string({
    required_error: "El email es requerido",
    invalid_type_error: "El email debe ser un string",
  })
  .trim()
  .email({
    message: "Ingresa un correo electrónico valido",
  });