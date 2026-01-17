import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormData, buildSchema } from "../schemas/form-schema";
import { normalizeFormData } from "../utils/normalize-form-data";
import { createProspect } from "@/features/prospects/actions/create-prospect";
import { createQuoteAction } from "@/features/quote/actions/create-quote";

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
  questions.map((question: any) => ({
    [`answer-${question.id}`]: "No",
    healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  }));

export const hasValidChildren = (children: any[], count: number) =>
  children &&
  children.length === count &&
  children.every(
    (child: { age: number; gender: string }) => child.age >= 0 && child.gender
  );

export const hasValidProtectedPersons = (persons: any[], count: number) =>
  persons &&
  persons.length === count &&
  persons.every(
    (person: { age: number; gender: string; relationship: string }) =>
      person.age >= 0 && person.gender && person.relationship
  );

export const contactInfoValidators: Record<string, (data: any) => boolean> = {
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

export const copyFields = (data: any, cleaned: any, keys: string[]) => {
  keys.forEach((key) => {
    if (data[key] !== undefined) {
      cleaned[key] = data[key];
    }
  });
};

export const dataCleaners: Record<string, (data: any, cleaned: any) => void> = {
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

export const cleanFormData = (data: FormData): Partial<FormData> => {
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

  const cleaner =
    dataCleaners[data.protectWho as keyof typeof dataCleaners] ||
    (() => {});
  cleaner(data, cleanedData);

  return cleanedData;
};

export const useQuoteFormRHF = (initialState?: any) => {
  const defaultValues = useMemo(
    () => normalizeFormData(initialState) as FormData,
    [initialState]
  );

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState,
  } = useForm<FormData>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [showContactInfo, setShowContactInfo] = useState(false);
  const [flatErrors, setFlatErrors] = useState<Record<string, string>>({});

  const formData = watch();

  useEffect(() => {
    const { name, gender, postalCode, protectWho } = formData;
    const baseFieldsFilled = Boolean(
      name && gender && postalCode && protectWho
    );
    if (!baseFieldsFilled) {
      setShowContactInfo(false);
      return;
    }
    const validator = contactInfoValidators[protectWho];
    if (!validator) {
      setShowContactInfo(false);
      return;
    }
    setShowContactInfo(validator(formData));
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const current = getValues();
    const updated: any = { ...current, [field]: value };

    if (field === "childrenCount" && !Number.isNaN(value)) {
      const count = typeof value === "number" ? value : Number(value) || 0;
      updated.children = Array.from({ length: count }, (_, index) => {
        return current.children?.[index] ?? { age: 0, gender: "" };
      });
      setValue("children" as any, updated.children, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    if (field === "protectedCount") {
      const count = typeof value === "number" ? value : Number(value) || 0;
      updated.protectedPersons = Array.from({ length: count }, (_, index) => {
        return (
          current.protectedPersons?.[index] ?? {
            relationship: "",
            age: 0,
            gender: "",
          }
        );
      });
      setValue("protectedPersons" as any, updated.protectedPersons, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    setValue(field as any, value as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
    clearErrors(field as any);
    setFlatErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const handleChildChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const current = getValues();
    const children = Array.from(
      { length: current.childrenCount || 0 },
      (_, i) => current.children?.[i] ?? { age: 0, gender: "" }
    );

    children[index] = {
      ...children[index],
      [field]: value,
    };

    setValue("children" as any, children as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  const handleProtectedPersonChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const current = getValues();
    const protectedPersons = Array.from(
      { length: current.protectedCount || 0 },
      (_, i) =>
        current.protectedPersons?.[i] ?? {
          relationship: "",
          age: 0,
          gender: "",
        }
    );

    protectedPersons[index] = {
      ...protectedPersons[index],
      [field]: value,
    };

    setValue("protectedPersons" as any, protectedPersons as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const schema = buildSchema(values.protectWho!);
      const validatedData = schema.parse(values);
      const cleanedData = cleanFormData(validatedData as FormData);

      if (!initialState) {
        await createProspect(cleanedData);
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue: z.ZodIssue) => {
          const path = issue.path.join(".");
          if (!path) return;
          const message = issue.message || "Dato inválido";
          newErrors[path] = message;
          setError(path as any, { type: "manual", message });
        });
        setFlatErrors(newErrors);
      }
    }
  });

  return {
    formData,
    errors: flatErrors,
    showContactInfo,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    handleSubmit: onSubmit,
    isSubmitting: formState.isSubmitting,
  };
};

export const useQuoteFinalizationFormRHF = (
  initialState?: any,
  questions?: any[]
) => {
  const defaultValues = useMemo(
    () => normalizeFormData(initialState) as FormData,
    [initialState]
  );

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState,
  } = useForm<FormData>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [flatErrors, setFlatErrors] = useState<Record<string, string>>({});
  const [forms, setForms] = useState<any[]>(() =>
    questions
      ? initialState && (initialState as any).medicalHistories
        ? (initialState as any).medicalHistories
        : createInitialMedicalForms(questions)
      : []
  );
  const [medicalErrors, setMedicalErrors] = useState<Record<string, string>>(
    {}
  );

  const formData = watch();

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    const current = getValues();
    const updated: any = { ...current, [field]: value };

    if (field === "childrenCount" && !Number.isNaN(value)) {
      const count = typeof value === "number" ? value : Number(value) || 0;
      updated.children = Array.from({ length: count }, (_, index) => {
        return current.children?.[index] ?? { age: 0, gender: "" };
      });
      setValue("children" as any, updated.children, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    if (field === "protectedCount") {
      const count = typeof value === "number" ? value : Number(value) || 0;
      updated.protectedPersons = Array.from({ length: count }, (_, index) => {
        return (
          current.protectedPersons?.[index] ?? {
            relationship: "",
            age: 0,
            gender: "",
          }
        );
      });
      setValue("protectedPersons" as any, updated.protectedPersons, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    setValue(field as any, value as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
    clearErrors(field as any);
    setFlatErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const handleChildChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const current = getValues();
    const children = Array.from(
      { length: current.childrenCount || 0 },
      (_, i) => current.children?.[i] ?? { age: 0, gender: "" }
    );

    children[index] = {
      ...children[index],
      [field]: value,
    };

    setValue("children" as any, children as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  const handleProtectedPersonChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const current = getValues();
    const protectedPersons = Array.from(
      { length: current.protectedCount || 0 },
      (_, i) =>
        current.protectedPersons?.[i] ?? {
          relationship: "",
          age: 0,
          gender: "",
        }
    );

    protectedPersons[index] = {
      ...protectedPersons[index],
      [field]: value,
    };

    setValue("protectedPersons" as any, protectedPersons as any, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  const validateMedicalConditions = () => {
    if (!questions) return {};
    const medicalErrors: Record<string, string> = {};

    forms.forEach((form, questionIndex) => {
      const questionId = questions[questionIndex]?.id ?? questionIndex;
      const answerKey = `answer-${questionId}`;
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
  };

  const formatMedicalData = () => {
    if (!questions) return [];
    return forms.map((form, index) => {
      const questionId = questions[index]?.id ?? index;
      const answerKey = `answer-${questionId}`;
      return {
        answer: form[answerKey],
        [`${answerKey}`]: form[answerKey],
        questionId,
        healthConditions: form.healthConditions || [],
        activePadecimiento: form.activePadecimiento,
      };
    });
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const schema = buildSchema(values.protectWho!);
      const validatedData = schema.parse(values);
      const cleanedData = cleanFormData(validatedData as FormData);

      if (questions && forms.length > 0) {
        const medErrors = validateMedicalConditions();
        if (Object.keys(medErrors).length > 0) {
          setMedicalErrors(medErrors);
          return;
        }
        const medicalData = formatMedicalData();
        const hasCreatedEarly =
          typeof document !== "undefined" &&
          document.cookie.split("; ").some((c) => c.startsWith("quoteCreated="));

        if (!hasCreatedEarly) {
          await createQuoteAction(
            {
              medicalData,
              prospectData: cleanedData,
            },
            {
              deleteCookies: false,
              redirectTo: "/cotizar/enviando",
              setCreatedCookie: true,
            }
          );
        }
      }

      if (!initialState) {
        await createProspect(cleanedData);
      }
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue: z.ZodIssue) => {
          const path = issue.path.join(".");
          if (!path) return;
          const message = issue.message || "Dato inválido";
          newErrors[path] = message;
          setError(path as any, { type: "manual", message });
        });
        setFlatErrors(newErrors);
      }
    }
  });

  return {
    formData,
    errors: flatErrors,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    handleSubmit: onSubmit,
    forms,
    setForms,
    currentMedicalErrors: medicalErrors,
    isSubmitting: formState.isSubmitting,
  };
};
