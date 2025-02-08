import { useState, useEffect, useMemo, useCallback } from "react";
import { z } from "zod";
import { FormData, buildSchema } from "../schemas/form-schema";
import { createProspect } from "@/features/prospects/actions/create-prospect";
import { createQuoteAction } from "@/features/quote/actions/create-quote";
import { useModalStore } from "@/shared/store/modal-store";
import { normalizeFormData } from "../utils/normalize-form-data";

const INITIAL_HEALTH_CONDITION = {
  hospitalizado: "No",
  complicacion: "No",
  estadoSalud: "Sano",
  medicamento: "No",
  nombrePadecimiento: "",
  tipoEvento: "",
  tipoTratamiento: "",
  detalleComplicacion: "",
  detalleMedicamento: "",
};

const createInitialMedicalForms = (questions: any[]) =>
  questions.map((question) => ({
    [`answer-${question.id}`]: "No",
    healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  }));

const hasValidChildren = (children: any[], count: number) =>
  children &&
  children.length === count &&
  children.every(
    (child: { age: number; gender: string }) => child.age >= 0 && child.gender
  );

const hasValidProtectedPersons = (persons: any[], count: number) =>
  persons &&
  persons.length === count &&
  persons.every(
    (person: { age: number; gender: string; relationship: string }) =>
      person.age >= 0 && person.gender && person.relationship
  );

const contactInfoValidators: Record<string, (data: any) => boolean> = {
  solo_yo: (data) => Boolean(data.age),
  mi_pareja_y_yo: (data) =>
    Boolean(data.age && data.partnerGender && data.partnerAge),
  familia: (data) =>
    Boolean(
      data.age &&
        data.partnerGender &&
        data.partnerAge &&
        data.childrenCount &&
        hasValidChildren(data.children, data.childrenCount)
    ),
  mis_hijos_y_yo: (data) =>
    Boolean(
      data.childrenCount && hasValidChildren(data.children, data.childrenCount)
    ),
  solo_mis_hijos: (data) =>
    Boolean(
      data.childrenCount && hasValidChildren(data.children, data.childrenCount)
    ),
  otros: (data) =>
    Boolean(
      data.protectedCount &&
        hasValidProtectedPersons(data.protectedPersons, data.protectedCount)
    ),
  mis_padres: (data) =>
    Boolean(data.momName && data.dadName && data.momAge && data.dadAge),
};

const copyFields = (data: any, cleaned: any, keys: string[]) => {
  keys.forEach((key) => {
    if (data[key] !== undefined) {
      cleaned[key] = data[key];
    }
  });
};

const dataCleaners: Record<string, (data: any, cleaned: any) => void> = {
  solo_yo: (data, cleaned) => copyFields(data, cleaned, ["age"]),
  mi_pareja_y_yo: (data, cleaned) =>
    copyFields(data, cleaned, ["age", "partnerGender", "partnerAge"]),
  familia: (data, cleaned) =>
    copyFields(data, cleaned, [
      "age",
      "partnerGender",
      "partnerAge",
      "childrenCount",
      "children",
    ]),
  mis_hijos_y_yo: (data, cleaned) =>
    copyFields(data, cleaned, ["age", "childrenCount", "children"]),
  solo_mis_hijos: (data, cleaned) =>
    copyFields(data, cleaned, ["childrenCount", "children"]),
  otros: (data, cleaned) =>
    copyFields(data, cleaned, ["protectedCount", "protectedPersons"]),
  mis_padres: (data, cleaned) =>
    copyFields(data, cleaned, ["momName", "dadName", "momAge", "dadAge"]),
};

export const useGetQuoteForm = (initialState?: any, questions?: any[]) => {
  const { openModal, closeModal } = useModalStore();
  const [formData, setFormData] = useState<FormData>(() => {
    return normalizeFormData(initialState);
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [medicalErrors, setMedicalErrors] = useState<Record<string, string>>(
    {}
  );
  const [showContactInfo, setShowContactInfo] = useState(false);

  const [forms, setForms] = useState<any[]>(() =>
    questions
      ? initialState && initialState.medicalHistories
        ? initialState.medicalHistories
        : createInitialMedicalForms(questions)
      : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateMedicalConditions = useCallback(() => {
    if (!questions) return {};
    const medicalErrors: Record<string, string> = {};

    forms.forEach((form, questionIndex) => {
      const answerKey = `answer-${questions[questionIndex]?.id ?? questionIndex}`;
      if (form[answerKey] === "No") return;

      if (!form.healthConditions || form.healthConditions.length === 0) {
        medicalErrors[`question-${questionIndex}-noPadecimiento`] =
          "Debe agregar al menos un padecimiento.";
        return;
      }

      form.healthConditions.forEach(
        (condition: any, conditionIndex: number) => {
          const key = (field: string) =>
            `question-${questionIndex}-condition-${conditionIndex}-${field}`;
          const required: Record<string, string> = {
            nombrePadecimiento: "El nombre del padecimiento es requerido.",
            tipoEvento: "El tipo de evento es requerido.",
            fechaInicio: "La fecha de inicio es requerida.",
            tipoTratamiento: "El tipo de tratamiento es requerido.",
          };
          Object.entries(required).forEach(([field, message]) => {
            if (!condition[field]?.toString().trim()) {
              medicalErrors[key(field)] = message;
            }
          });
          if (!condition.persona?.toString().trim()) {
            medicalErrors[key("persona")] = "El campo persona es requerido.";
          }
          if (
            condition.complicacion === "Sí" &&
            !condition.detalleComplicacion?.trim()
          ) {
            medicalErrors[key("detalleComplicacion")] =
              "Debe especificar la complicación.";
          }
          if (
            condition.medicamento === "Sí" &&
            !condition.detalleMedicamento?.trim()
          ) {
            medicalErrors[key("detalleMedicamento")] =
              "Debe especificar el medicamento.";
          }
        }
      );
    });
    return medicalErrors;
  }, [forms, questions]);

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

  // Reemplazamos el switch en checkIfContactInfoShouldShow
  const checkIfContactInfoShouldShow = useCallback((): boolean => {
    const { name, gender, postalCode, protectWho } = formData;
    const baseFieldsFilled = Boolean(
      name && gender && postalCode && protectWho
    );
    if (!baseFieldsFilled) return false;
    return (contactInfoValidators[protectWho] || (() => false))(formData);
  }, [formData]);

  useEffect(() => {
    setShowContactInfo(checkIfContactInfoShouldShow());
  }, [formData, checkIfContactInfoShouldShow]);

  // Modificamos cleanFormData usando el objeto dataCleaners
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

    (dataCleaners[data.protectWho] || (() => {}))(data, cleanedData);

    return cleanedData;
  };

  const formatMedicalData = () => {
    if (!questions) return [];
    return forms.map((form, index) => {
      const questionId = questions[index]?.id ?? index;
      const answerKey = `answer-${questionId}`;
      return {
        answer: form[answerKey],
        [`${answerKey}`]: form[answerKey], // Añadimos el campo answer-{index}
        questionId,
        healthConditions: form.healthConditions || [],
        activePadecimiento: form.activePadecimiento, // Mantenemos el activePadecimiento
      };
    });
  };

  const unifiedHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const schema = buildSchema(formData.protectWho!);
      const validatedData = schema.parse(formData);
      const cleanedData = cleanFormData(validatedData);

      if (questions && forms.length > 0) {
        const medErrors = validateMedicalConditions();
        if (Object.keys(medErrors).length > 0) {
          setMedicalErrors(medErrors);
          return;
        }
        const medicalData = formatMedicalData();
        await createQuoteAction({
          medicalData,
          prospectData: cleanedData,
        });
      }

      if (!initialState) {
        await createProspect(cleanedData);
      }
      closeModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErr: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErr[err.path.join(".")] = err.message;
        });
        setErrors(newErr);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFormQuoteModal = (prospect: any) =>
    openModal("formQuote", { prospect });

  return {
    formData,
    errors,
    showContactInfo,
    handleInputChange,
    handleSubmit: unifiedHandleSubmit,
    handleProtectedPersonChange,
    handleChildChange,
    openFormQuoteModal,
    forms,
    setForms,
    isSubmitting,
    currentMedicalErrors: medicalErrors,
  };
};
