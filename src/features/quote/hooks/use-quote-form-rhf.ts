import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormData, buildSchema } from "../schemas/form-schema";
import { normalizeFormData } from "../utils/normalize-form-data";
import {
  cleanFormData,
  contactInfoValidators,
  createQuoteFormHandlers,
  FlatErrors,
} from "../utils/form-helpers";
import { createProspect } from "@/features/prospects/actions/create-prospect";

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
  const [flatErrors, setFlatErrors] = useState<FlatErrors>({});

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

  const {
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
  } = createQuoteFormHandlers({
    getValues,
    setValue,
    clearErrors,
    setFlatErrors,
  });

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
