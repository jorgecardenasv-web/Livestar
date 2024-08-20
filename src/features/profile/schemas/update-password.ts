import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "La contraseña antigente es requerida",
        invalid_type_error: "La contraseña antigente debe ser un string",
      })
      .trim()
      .min(6, "La contraseña antigente debe tener al menos 6 caracteres"),
    newPassword: z
      .string({
        required_error: "La nueva contraseña es requerida",
        invalid_type_error: "La nueva contraseña debe ser un string",
      })
      .trim()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string({
        required_error: "La confirmación de la nueva contraseña es requerida",
        invalid_type_error:
          "La confirmación de la nueva contraseña debe ser un string",
      })
      .trim()
      .min(
        6,
        "La confirmación de la nueva contraseña debe tener al menos 6 caracteres"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
