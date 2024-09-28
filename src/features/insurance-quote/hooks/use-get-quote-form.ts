import { useState, useEffect } from "react";
import { z } from "zod";
import { baseSchema, buildSchema } from "../schemas/schema-builder";



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
            Object.values(formData.childrenAges as number[]).every((age) => age > 0)
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
            Object.values(formData.childrenAges as number[]).every((age) => age > 0)
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
            Object.values(formData.protectedAges as number[]).every((age) => age > 0)
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
