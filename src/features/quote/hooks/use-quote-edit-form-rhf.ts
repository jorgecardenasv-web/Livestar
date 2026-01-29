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

  const { watch, setValue, getValues, clearErrors, reset } = useForm<FormData>({
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

  // Solo reinicializar forms cuando cambie el ID de la cotización, no en cada update
  const [lastQuoteId, setLastQuoteId] = useState<string | null>(
    initialState?.id || null
  );

  useEffect(() => {
    if (!questions) return;

    // Solo reinicializar si cambió el ID de la cotización (navegamos a otra cotización)
    const currentQuoteId = initialState?.id || null;
    if (currentQuoteId !== lastQuoteId) {
      const nextForms =
        initialState && (initialState as any).medicalHistories
          ? ((initialState as any).medicalHistories as MedicalQuestionForm[])
          : (createInitialMedicalForms(questions) as MedicalQuestionForm[]);

      setForms(nextForms);
      setLastQuoteId(currentQuoteId);
      
      // También resetear el formulario de React Hook Form solo cuando cambia la cotización
      reset(normalizeFormData(initialState) as FormData);
    }
  }, [initialState, questions, lastQuoteId, reset]);

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
