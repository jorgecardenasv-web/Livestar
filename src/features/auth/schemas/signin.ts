import { emailValidation } from "@/shared/utils/validations";
import { z } from "zod";

export const signinSchema = z.object({
  email: emailValidation,
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .trim()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(32, {
      message: "La contraseña debe tener como maximo 32 caracteres",
    }),
});