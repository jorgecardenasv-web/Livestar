import { z } from "zod";

export const baseSchema = z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, "Por favor escribe tu nombre"),
    gender: z
      .string({ required_error: "El género es requerido" })
      .min(1, "Indica tu genero"),
    postalCode: z
      .string({ required_error: "El código postal es requerido" })
      .length(5, "El código postal debe tener 5 dígitos"),
    protectWho: z
      .string({ required_error: "Debes seleccionar a quién quieres proteger" })
      .min(1, "Selecciona a quién quieres proteger"),
    whatsapp: z
      .string({ required_error: "El número de WhatsApp es requerido" })
      .min(10, "El número de WhatsApp debe tener al menos 10 dígitos"),
    email: z
      .string({ required_error: "El correo electrónico es requerido" })
      .email("Escribe un correo electrónico válido"),
  });
  
export const additionalFields = {
    solo_yo: z.object({
      age: z
        .number({ required_error: "La edad es requerida" })
        .min(18, "Debes de ser mayor de 18 años"),
    }),
    mi_pareja_y_yo: z.object({
      age: z
        .number({ required_error: "Tu edad es requerida" })
        .min(18, "Debes de ser mayor de 18 años"),
      partnerGender: z
        .string({ required_error: "El género de tu pareja es requerido" })
        .min(1, "Indica el genero de pareja"),
      partnerAge: z
        .number({ required_error: "La edad de tu pareja es requerida" })
        .min(18, "Tu pareja debe ser mayor de 18 años"),
    }),
    familia: z.object({
      age: z
        .number({ required_error: "Tu edad es requerida" })
        .min(18, "Debes de ser mayor de 18 años"),
      partnerGender: z
        .string({ required_error: "El género de tu pareja es requerido" })
        .min(1, "Indica el genero de pareja"),
      partnerAge: z
        .number({ required_error: "La edad de tu pareja es requerida" })
        .min(18, "Tu pareja debe ser mayor de 18 años"),
      childrenCount: z
        .number({ required_error: "El número de hijos es requerido" })
        .min(1, "Indica el número de hijos"),
      childrenAges: z
        .array(
          z.number({ required_error: "La edad de cada hijo es requerida" }).min(0)
        )
        .min(1, "Indica la edad de tus hijos"),
    }),
    mis_hijos_y_yo: z.object({
      age: z
        .number({
          required_error: "Debes de ser mayor de 18 años",
        })
        .min(18, "Debes de ser mayor de 18 años"),
      childrenCount: z
        .number({ required_error: "Indica cuantos hijos tienes" })
        .min(1, "Indica el número de hijos"),
      childrenAges: z
        .array(
          z
            .number({
              required_error: "Indica la edad de tus hijos",
            })
            .min(0)
        )
        .min(1, "Indica la edad de tus hijos"),
    }),
    solo_mis_hijos: z.object({
      childrenCount: z
        .number({ required_error: "Indica el número de hijos" })
        .min(1, "Indica el número de hijos"),
      childrenAges: z
        .array(
          z.number({ required_error: "La edad de cada hijo es requerida" }).min(0)
        )
        .min(0, "Indica la edad de tus hijos"),
    }),
    otros: z.object({
      relationship: z
        .string({ required_error: "Escribe su parentezco contigo" })
        .min(1, "Selecciona quines"),
      protectedCount: z
        .number({ required_error: "Indica cuantas personas quieres proteger" })
        .min(1, "Indica cuántas personas quieres proteger"),
      protectedAges: z
        .array(
          z
            .number({
              required_error: "Indica la edad de las personas a proteger",
            })
            .min(0)
        )
        .min(1, "Indica la edad de las personas a proteger"),
    }),
    mis_padres: z.object({
      momName: z
        .string({ required_error: "Por favor escribe el nombre de mamá" })
        .min(1, "Por favor escribe el nombre de mamá"),
      dadName: z
        .string({ required_error: "Por favor escribe el nombre de papá" })
        .min(1, "Por favor escribe el nombre de papá"),
      momAge: z
        .number({ required_error: "Mamá de ser mayor de 18 años" })
        .min(18, "Tu madre debe ser mayor de 18 años"),
      dadAge: z
        .number({ required_error: "Papá de ser mayor de 18 años" })
        .min(18, "Tu padre debe ser mayor de 18 años"),
    }),
  };
 export const buildSchema = (protectWho: string) => {
    const additionalSchema =
      additionalFields[protectWho as keyof typeof additionalFields] ||
      z.object({});
    return baseSchema.merge(additionalSchema);
  };