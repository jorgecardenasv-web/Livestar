import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Por favor escribe tu nombre"),
  gender: z.string().min(1, "Indica tu genero"),
  postalCode: z.string().length(5, "El código postal debe tener 5 dígitos"),
  protectWho: z.string().min(1, "Selecciona a quién quieres proteger"),
  partnerGender: z.string().min(1, "Indica el genero de pareja").optional(),
  age: z.number().min(18, "Debes de ser mayor de 18 años").optional(),
  partnerAge: z.number().optional(),
  childrenCount: z.number().min(1).optional(),
  childrenAges: z.array(z.number().min(0)).optional(),
  relationship: z.string().min(1, "Selecciona qué relación tienen contigo").optional(),
  protectedCount: z.number().min(1).optional(),
  protectedAges: z.array(z.number().min(0)).optional(),
  momName: z.string().min(1, "Por favor escribe el nombre de mamá").optional(),
  dadName: z.string().min(1, "Por favor escribe el nombre de papá").optional(),
  momAge: z.number().min(18, "Tu madre debe ser mayor de 18 años").optional(),
  dadAge: z.number().min(18, "Tu padre debe ser mayor de 18 años").optional(),
  whatsapp: z
    .string()
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos"),
  email: z.string().email("escribe un correo electrónico válido"),
});

export type FormData = z.infer<typeof formSchema>;
