import { useState, useEffect } from "react";
import { z } from "zod";
import { formSchema } from "../schemas/form-schema";

const baseSchema = z.object({
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

const additionalFields = {
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
const buildSchema = (protectWho: string) => {
  const additionalSchema =
    additionalFields[protectWho as keyof typeof additionalFields] ||
    z.object({});
  return baseSchema.merge(additionalSchema);
};

export type FormData = z.infer<typeof baseSchema> & {
  [key: string]: any;
};

export const useGetQuoteForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    postalCode: "",
    protectWho: "",
    whatsapp: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showContactInfo, setShowContactInfo] = useState(false);

  const validateField = (field: keyof FormData, value: any) => {
    const schema = buildSchema(formData.protectWho);

    try {
      (schema.shape as typeof schema.shape)[
        field as keyof typeof schema.shape
      ].parse(value); //{ [key: string]: any }?
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };

      if (field === "childrenCount") {
        const count = typeof value === "number" ? value : 0;
        updatedData.childrenAges = count > 0 ? Array(count).fill(0) : [];
      }

      if (field === "protectedCount") {
        const count = typeof value === "number" ? value : 0;
        updatedData.protectedAges = count > 0 ? Array(count).fill(0) : [];
      }

      return updatedData;
    });

    validateField(field, value);
  };

  const handleChildAgeChange = (index: number, value: number) => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: prev.childrenAges
        ? prev.childrenAges.map((age: number, i: number) =>
            i === index ? value : age
          ) //need to add a type now
        : [value],
    }));
    validateField(
      "childrenAges",
      formData.childrenAges?.map((age: number, i: number) =>
        i === index ? value : age
      ) || [value]
    );
  };

  const handleProtectedAgeChange = (index: number, value: number) => {
    setFormData((prev) => ({
      ...prev,
      protectedAges: prev.protectedAges
        ? prev.protectedAges.map((age: number, i: number) =>
            i === index ? value : age
          )
        : [value],
    }));
    validateField(
      "protectedAges",
      formData.protectedAges?.map((age: number, i: number) =>
        i === index ? value : age
      ) || [value]
    );
  };

  const checkIfContactInfoShouldShow = (): boolean => {
    switch (formData.protectWho) {
      case "solo_yo":
        return Boolean(
          formData.name &&
            formData.age &&
            formData.gender &&
            formData.postalCode
        );
      case "mi_pareja_y_yo":
        return Boolean(
          formData.name &&
            formData.age &&
            formData.gender &&
            formData.postalCode &&
            formData.partnerGender &&
            formData.partnerAge
        );
      case "familia":
      case "mis_hijos_y_yo":
        return Boolean(
          formData.age &&
            formData.gender &&
            formData.postalCode &&
            formData.childrenCount !== undefined &&
            formData.childrenAges &&
            Object.keys(formData.childrenAges).length ===
              formData.childrenCount &&
            Object.values(formData.childrenAges).every((age) => age > 0)
        );
      case "solo_mis_hijos":
        return Boolean(
          formData.name &&
            //formData.age &&
            formData.gender &&
            formData.postalCode &&
            formData.childrenCount !== undefined &&
            formData.childrenAges &&
            Object.keys(formData.childrenAges).length ===
              formData.childrenCount &&
            Object.values(formData.childrenAges).every((age) => age > 0)
        );
      case "otros":
        return Boolean(
          formData.name &&
            formData.gender &&
            formData.postalCode &&
            formData.protectedCount !== undefined &&
            formData.protectedAges &&
            Object.keys(formData.protectedAges).length ===
              formData.protectedCount &&
            Object.values(formData.protectedAges).every((age) => age > 0)
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    setShowContactInfo(checkIfContactInfoShouldShow());
  }, [formData]);

  const cleanFormData = (data: FormData): Partial<FormData> => {
    const schema = buildSchema(data.protectWho);
    const cleanedData: Partial<FormData> = {};
    Object.keys(schema.shape).forEach((key) => {
      if (data[key] !== undefined) {
        cleanedData[key] = data[key];
      }
    });
    return cleanedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalSchema = buildSchema(formData.protectWho);
      const validatedData = finalSchema.parse(formData);
      const cleanedData = cleanFormData(validatedData);
      const formDataString = JSON.stringify(cleanedData, null, 2);
      alert(`Formulario enviado con éxito:\n${formDataString}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path.join(".")] = err.message;
        });
        setErrors(newErrors);

        console.error(newErrors);
      }
    }
  };

  return {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleChildAgeChange,
    handleProtectedAgeChange,
    handleSubmit,
  };
};
