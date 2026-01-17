import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "../schemas/form-schema";
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
  const [forms, setForms] = useState<any[]>(() =>
    questions
      ? initialState && (initialState as any).medicalHistories
        ? (initialState as any).medicalHistories
        : createInitialMedicalForms(questions)
      : []
  );

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
