import { z } from "zod";

export const baseSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido." })
    .min(1, "Por favor, escribe tu nombre."),
  gender: z
    .string({ required_error: "El género es requerido." })
    .min(1, "Indica tu género."),
  postalCode: z
    .string({ required_error: "El código postal es requerido." })
    .length(5, "El código postal debe tener 5 dígitos."),
  protectWho: z
    .string({ required_error: "Debes seleccionar a quién quieres proteger." })
    .min(1, "Selecciona a quién quieres proteger."),
  whatsapp: z
    .string({ required_error: "El número de WhatsApp es requerido." })
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos."),
  email: z
    .string({ required_error: "El correo electrónico es requerido." })
    .email("Escribe un correo electrónico válido."),
});

const childSchema = z.object({
  age: z.number().min(0, "La edad debe ser un número positivo."),
  gender: z.string().min(1, "Indica el género."),
});

const protectedPersonSchema = z.object({
  relationship: z.string().min(1, "Indica el parentesco."),
  age: z.number().min(0, "La edad debe ser un número positivo."),
  gender: z.string().min(1, "Indica el género."),
});

export const additionalFields = {
  solo_yo: z.object({
    age: z
      .number({ required_error: "La edad es requerida." })
      .min(18, "Debes de ser mayor de 18 años."),
  }),
  mi_pareja_y_yo: z.object({
    age: z
      .number({ required_error: "Tu edad es requerida." })
      .min(18, "Debes de ser mayor de 18 años."),
    partnerGender: z
      .string({ required_error: "El género de tu pareja es requerido." })
      .min(1, "Indica el género de pareja."),
    partnerAge: z
      .number({ required_error: "La edad de tu pareja es requerida." })
      .min(18, "Tu pareja debe ser mayor de 18 años."),
  }),
  familia: z.object({
    age: z.number().min(18, "Debes ser mayor de 18 años."),
    partnerGender: z.string().min(1, "Indica el género de tu pareja."),
    partnerAge: z.number().min(18, "Tu pareja debe ser mayor de 18 años."),
    childrenCount: z.number().min(1, "Indica el número de hijos."),
    children: z
      .array(childSchema)
      .min(1, "Debes proporcionar información para al menos un hijo."),
  }),
  mis_hijos_y_yo: z.object({
    age: z.number().min(18, "Debes ser mayor de 18 años."),
    childrenCount: z.number().min(1, "Indica el número de hijos."),
    children: z
      .array(childSchema)
      .min(1, "Debes proporcionar información para al menos un hijo."),
  }),
  solo_mis_hijos: z.object({
    childrenCount: z.number().min(1, "Indica el número de hijos."),
    children: z
      .array(childSchema)
      .min(1, "Debes proporcionar información para al menos un hijo."),
  }),
  otros: z.object({
    protectedCount: z
      .number()
      .min(1, "Indica cuántas personas quieres proteger."),
    protectedPersons: z
      .array(protectedPersonSchema)
      .min(1, "Debes proporcionar información para al menos una persona."),
  }),
  mis_padres: z.object({
    momName: z
      .string({ required_error: "Por favor, escribe el nombre de mamá." })
      .min(1, "Por favor, escribe el nombre de mamá."),
    dadName: z
      .string({ required_error: "Por favor, escribe el nombre de papá." })
      .min(1, "Por favor, escribe el nombre de papá."),
    momAge: z
      .number({ required_error: "Mamá debe ser mayor de 18 años." })
      .min(18, "Tu madre debe ser mayor de 18 años."),
    dadAge: z
      .number({ required_error: "Papá debe ser mayor de 18 años." })
      .min(18, "Tu padre debe ser mayor de 18 años."),
  }),
};

export type FormData = z.infer<typeof baseSchema> & {
  [key: string]: any;
};

export const buildSchema = (protectWho: string) => {
  const additionalSchema =
    additionalFields[protectWho as keyof typeof additionalFields] ||
    z.object({});
  return baseSchema.merge(additionalSchema);
};
