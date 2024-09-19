import { emailValidation } from './../../../shared/utils/validations';
import { z } from "zod";

 export const insuranceFormSchema = z.object({
   name: z.string().min(1, "El nombre es requerido"),
   age: z.number().min(18, "Debes ser mayor de 18 años"),
   gender: z.enum(["hombre", "mujer", "otro"]),
   postalCode: z.string().regex(/^\d{5}$/, "Código postal inválido"),
   protectWho: z.enum(["familia", "pareja", "hijos"]),
   partnerGender: z.enum(["hombre", "mujer", "otro"]).optional(),
   partnerAge: z.number().optional(),
   children: z.number().min(0),
   childrenAges: z.array(z.number()).optional(),
   whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Número de WhatsApp inválido"),
   email: emailValidation
 });