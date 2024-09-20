import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  gender: z.string({
    errorMap: () => ({ message: "Selecciona un género" }),
  }),
  postalCode: z.string().length(5, "El código postal debe tener 5 dígitos"),
  protectWho: z.string({
    errorMap: () => ({ message: "Selecciona a quién quieres proteger" }),
  }),
  partnerGender: z.enum(["hombre", "mujer"]).optional(),
  age: z.number().min(18, "Debes ser mayor de 18 años"),
  partnerAge: z
    .number()
    .min(18, "Debes ser mayor de 18 años")
    .optional(),
  childrenCount: z
    .number()
    .min(1)
    .optional(),
  childrenAges: z
    .array(z.number().min(0))
    .optional(),
  whatsapp: z
    .string()
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos"),
  email: z.string().email("Ingresa un correo electrónico válido"),
});

export type FormData = z.infer<typeof formSchema>;