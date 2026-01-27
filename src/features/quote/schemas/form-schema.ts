import { z } from "zod";

export const baseSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El nombre es requerido."
          : "El nombre debe ser un string.",
    })
    .min(1, "Por favor, escribe tu nombre."),
  gender: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El género es requerido."
          : "El género debe ser un string.",
    })
    .min(1, "Indica tu género."),
  postalCode: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El código postal es requerido."
          : "El código postal debe ser un string.",
    })
    .length(5, "El código postal debe tener 5 dígitos."),
  protectWho: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Debes seleccionar a quién quieres proteger."
          : "El valor debe ser un string.",
    })
    .min(1, "Selecciona a quién quieres proteger."),
  whatsapp: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El número de WhatsApp es requerido."
          : "El número de WhatsApp debe ser un string.",
    })
    .min(10, "El número de WhatsApp debe tener al menos 10 dígitos."),
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "El correo electrónico es requerido."
          : "El correo electrónico debe ser un string.",
    })
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
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "La edad es requerida."
            : "La edad debe ser un número.",
      })
      .min(18, "Debes de ser mayor de 18 años."),
  }),
  mi_pareja_y_yo: z.object({
    age: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "Tu edad es requerida."
            : "La edad debe ser un número.",
      })
      .min(18, "Debes de ser mayor de 18 años."),
    partnerGender: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "El género de tu pareja es requerido."
            : "El género de tu pareja debe ser un string.",
      })
      .min(1, "Indica el género de pareja."),
    partnerAge: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "La edad de tu pareja es requerida."
            : "La edad de tu pareja debe ser un número.",
      })
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
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Por favor, escribe el nombre de mamá."
            : "El nombre de mamá debe ser un string.",
      })
      .min(1, "Por favor, escribe el nombre de mamá."),
    dadName: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Por favor, escribe el nombre de papá."
            : "El nombre de papá debe ser un string.",
      })
      .min(1, "Por favor, escribe el nombre de papá."),
    momAge: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "Mamá debe ser mayor de 18 años."
            : "La edad de mamá debe ser un número.",
      })
      .min(18, "Tu madre debe ser mayor de 18 años."),
    dadAge: z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "Papá debe ser mayor de 18 años."
            : "La edad de papá debe ser un número.",
      })
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
