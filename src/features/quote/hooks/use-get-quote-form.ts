import { useState, useEffect } from "react";
import { z } from "zod";
import { FormData, buildSchema } from "../schemas/form-schema";
import { createProspect } from "@/features/prospects/actions/create-prospect";
import { useModalStore } from "@/shared/store/modal-store";

export const useGetQuoteForm = (initialState?: any) => {
  const { openModal, closeModal } = useModalStore();
  const [formData, setFormData] = useState<FormData>(() => {
    return initialState || {};
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showContactInfo, setShowContactInfo] = useState(false);

  const validateField = (field: keyof FormData, value: any) => {
    const schema = buildSchema(formData.protectWho!);

    try {
      (schema.shape as typeof schema.shape)[
        field as keyof typeof schema.shape
      ].parse(value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as number];
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
    setFormData((prev: any) => {
      const updatedData = { ...prev, [field]: value };

      if (field === "childrenCount" && !Number.isNaN(value)) {
        const count = typeof value === "number" ? value : 0;

        updatedData.children = Array(count).fill({ age: 0, gender: "" });
      }

      if (field === "protectedCount") {
        const count = typeof value === "number" ? value : 0;
        updatedData.protectedPersons = Array(count).fill({
          relationship: "",
          age: 0,
          gender: "",
        });
      }

      return updatedData;
    });

    validateField(field, value);
  };

  const handleChildChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData((prevData: any) => {
      const updatedChildren = [...(prevData.children || [])];
      if (!updatedChildren[index]) {
        updatedChildren[index] = { age: 0, gender: "" };
      }
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };
      return {
        ...prevData,
        children: updatedChildren,
      };
    });
  };

  const handleProtectedPersonChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setFormData((prevData: any) => {
      const updatedProtectedPersons = [...(prevData.protectedPersons || [])];
      if (!updatedProtectedPersons[index]) {
        updatedProtectedPersons[index] = {
          relationship: "",
          age: 0,
          gender: "",
        };
      }
      updatedProtectedPersons[index] = {
        ...updatedProtectedPersons[index],
        [field]: value,
      };
      return {
        ...prevData,
        protectedPersons: updatedProtectedPersons,
      };
    });
  };

  const checkIfContactInfoShouldShow = (): boolean => {
    const baseFieldsFilled = Boolean(
      formData.name &&
        formData.gender &&
        formData.postalCode &&
        formData.protectWho
    );

    if (!baseFieldsFilled) return false;

    switch (formData.protectWho) {
      case "solo_yo":
        return Boolean(formData.age);
      case "mi_pareja_y_yo":
        return Boolean(
          formData.age && formData.partnerGender && formData.partnerAge
        );
      case "familia":
        return Boolean(
          formData.age &&
            formData.partnerGender &&
            formData.partnerAge &&
            formData.childrenCount &&
            formData.children &&
            formData.children.length === formData.childrenCount &&
            formData.children.every(
              (child: { age: number; gender: string }) => {
                return child.age > 0 && child.gender;
              }
            )
        );
      case "mis_hijos_y_yo":
        return Boolean(
          formData.age &&
            formData.childrenCount &&
            formData.children &&
            formData.children.length === formData.childrenCount &&
            formData.children.every(
              (child: { age: number; gender: string }) => {
                return child.age > 0 && child.gender;
              }
            )
        );
      case "solo_mis_hijos":
        return Boolean(
          formData.childrenCount &&
            formData.children &&
            formData.children.length === formData.childrenCount &&
            formData.children.every(
              (child: { age: number; gender: string }) => {
                return child.age > 0 && child.gender;
              }
            )
        );
      case "otros":
        return Boolean(
          formData.protectedCount &&
            formData.protectedPersons &&
            formData.protectedPersons.length === formData.protectedCount &&
            formData.protectedPersons.every(
              (person: { age: number; gender: string; relationship: string }) =>
                person.age > 0 && person.gender && person.relationship
            )
        );
      case "mis_padres":
        return Boolean(
          formData.momName &&
            formData.dadName &&
            formData.momAge &&
            formData.dadAge
        );
      default:
        return false;
    }
  };

  useEffect(() => {
    setShowContactInfo(checkIfContactInfoShouldShow());
  }, [formData]);

  const cleanFormData = (data: FormData): Partial<FormData> => {
    const baseFields: (keyof FormData)[] = [
      "name",
      "gender",
      "postalCode",
      "protectWho",
      "whatsapp",
      "email",
    ];
    const cleanedData: Partial<FormData> = {};

    baseFields.forEach((field) => {
      if (data[field] !== undefined) {
        cleanedData[field] = data[field];
      }
    });

    switch (data.protectWho) {
      case "solo_yo":
        if (data.age !== undefined) cleanedData.age = data.age;
        break;
      case "mi_pareja_y_yo":
        if (data.age !== undefined) cleanedData.age = data.age;
        if (data.partnerGender !== undefined)
          cleanedData.partnerGender = data.partnerGender;
        if (data.partnerAge !== undefined)
          cleanedData.partnerAge = data.partnerAge;
        break;
      case "familia":
        if (data.age !== undefined) cleanedData.age = data.age;
        if (data.partnerGender !== undefined)
          cleanedData.partnerGender = data.partnerGender;
        if (data.partnerAge !== undefined)
          cleanedData.partnerAge = data.partnerAge;
        if (data.childrenCount !== undefined)
          cleanedData.childrenCount = data.childrenCount;
        if (data.children) cleanedData.children = data.children;
        break;
      case "mis_hijos_y_yo":
        if (data.age !== undefined) cleanedData.age = data.age;
        if (data.childrenCount !== undefined)
          cleanedData.childrenCount = data.childrenCount;
        if (data.children) cleanedData.children = data.children;
        break;
      case "solo_mis_hijos":
        if (data.childrenCount !== undefined)
          cleanedData.childrenCount = data.childrenCount;
        if (data.children) cleanedData.children = data.children;
        break;
      case "otros":
        if (data.protectedCount !== undefined)
          cleanedData.protectedCount = data.protectedCount;
        if (data.protectedPersons)
          cleanedData.protectedPersons = data.protectedPersons;
        break;
      case "mis_padres":
        if (data.momName !== undefined) cleanedData.momName = data.momName;
        if (data.dadName !== undefined) cleanedData.dadName = data.dadName;
        if (data.momAge !== undefined) cleanedData.momAge = data.momAge;
        if (data.dadAge !== undefined) cleanedData.dadAge = data.dadAge;
        break;
    }

    return cleanedData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schema = buildSchema(formData.protectWho!);
      const validatedData = schema.parse(formData);
      const cleanedData = cleanFormData(validatedData);
      await createProspect(cleanedData);
      closeModal();
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

  const openFormQuoteModal = (prospect: any) =>
    openModal("formQuote", { prospect });

  return {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleSubmit,
    handleProtectedPersonChange,
    handleChildChange,
    openFormQuoteModal,
  };
};
