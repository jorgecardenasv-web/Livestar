import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "../schemas/form-schema";
import type { MedicalQuestionForm } from "../types";
import { normalizeFormData } from "../utils/normalize-form-data";
import {
  createInitialMedicalForms,
  createQuoteFormHandlers,
  FlatErrors,
} from "../utils/form-helpers";

export const useQuoteEditFormRHF = (
  initialState?: any,
  questions?: any[]
) => {
  const defaultValues = useMemo(
    () => normalizeFormData(initialState) as FormData,
    [initialState]
  );

  const { watch, setValue, getValues, clearErrors } = useForm<FormData>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [flatErrors, setFlatErrors] = useState<FlatErrors>({});
  const [forms, setForms] = useState<MedicalQuestionForm[]>(() =>
    questions
      ? initialState && (initialState as any).medicalHistories
        ? ((initialState as any).medicalHistories as MedicalQuestionForm[])
        : (createInitialMedicalForms(questions) as MedicalQuestionForm[])
      : []
  );

  useEffect(() => {
    if (!questions) return;

    const nextForms =
      initialState && (initialState as any).medicalHistories
        ? ((initialState as any).medicalHistories as MedicalQuestionForm[])
        : (createInitialMedicalForms(questions) as MedicalQuestionForm[]);

    setForms(nextForms);
  }, [initialState, questions]);

  const formData = watch();

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

  return {
    formData,
    errors: flatErrors,
    handleInputChange,
    handleChildChange,
    handleProtectedPersonChange,
    forms,
    setForms,
  };
};
