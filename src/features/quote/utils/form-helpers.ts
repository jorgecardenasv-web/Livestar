import { FormData } from "../schemas/form-schema";
import type {
  UseFormGetValues,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

export const INITIAL_HEALTH_CONDITION = {
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

export const createInitialMedicalForms = (questions: any[]) =>
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

export type FlatErrors = Record<string, string>;

export const createQuoteFormHandlers = (deps: {
  getValues: UseFormGetValues<FormData>;
  setValue: UseFormSetValue<FormData>;
  clearErrors: UseFormClearErrors<FormData>;
  setFlatErrors: Dispatch<SetStateAction<FlatErrors>>;
}) => {
  const { getValues, setValue, clearErrors, setFlatErrors } = deps;

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
    const errorKey = `children.${index}.${field}`;
    setFlatErrors((prev) => {
      const next = { ...prev };
      delete next[errorKey];
      return next;
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
    const errorKey = `protectedPersons.${index}.${field}`;
    setFlatErrors((prev) => {
      const next = { ...prev };
      delete next[errorKey];
      return next;
    });
  };

  return {
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
  };
};
