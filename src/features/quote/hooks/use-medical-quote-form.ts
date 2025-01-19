import { useState, useCallback, useMemo } from "react";
import { FormDataMedical, Question, HealthCondition } from "@/features/quote/types";
import { createMedicalHistory } from "@/features/quote/actions/create-medical-history";

export const INITIAL_HEALTH_CONDITION: HealthCondition = {
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

export const createInitialForms = (questions: Question[]) => 
  questions.map(question => ({
    [`answer-${question.id}`]: "No",
    healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  }));

interface UseMedicalQuoteFormProps {
  questions: Question[];
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: unknown) => void;
}

export const useMedicalQuoteForm = ({ 
  questions, 
  onSubmitSuccess, 
  onSubmitError 
}: UseMedicalQuoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forms, setForms] = useState<FormDataMedical[]>(createInitialForms(questions));

  const validateHealthConditions = useCallback(() => {
    const newErrors: Record<string, string> = {};

    forms.forEach((form, questionIndex) => {
      if (form[`answer-${questionIndex}`] === "No") return;
      if (!form.healthConditions?.length) return;

      form.healthConditions.forEach((healthCondition, conditionIndex) => {
        if (!healthCondition) return;

        const errorKey = (field: string) => 
          `question-${questionIndex}-condition-${conditionIndex}-${field}`;

        const requiredFields = {
          nombrePadecimiento: "El nombre del padecimiento es requerido.",
          tipoEvento: "El tipo de evento es requerido.",
          fechaInicio: "La fecha de inicio es requerida.",
          tipoTratamiento: "El tipo de tratamiento es requerido.",
        };

        Object.entries(requiredFields).forEach(([field, message]) => {
          if (!healthCondition[field as keyof HealthCondition]?.toString().trim()) {
            newErrors[errorKey(field)] = message;
          }
        });

        if (healthCondition.complicacion === "Sí" && !healthCondition.detalleComplicacion?.trim()) {
          newErrors[errorKey("detalleComplicacion")] = "Debe especificar la complicación.";
        }

        if (healthCondition.medicamento === "Sí" && !healthCondition.detalleMedicamento?.trim()) {
          newErrors[errorKey("detalleMedicamento")] = "Debe especificar el medicamento.";
        }
      });
    });

    return newErrors;
  }, [forms]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateHealthConditions();
    if (Object.keys(validationErrors).length > 0) {
      setForms(prevForms => [...prevForms]);
      return;
    }

    try {
      await createMedicalHistory(forms);
      onSubmitSuccess?.();
    } catch (error) {
      onSubmitError?.(error);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [forms, validateHealthConditions, onSubmitSuccess, onSubmitError]);

  const currentErrors = useMemo(() => 
    isSubmitting ? validateHealthConditions() : {},
    [isSubmitting, validateHealthConditions]
  );

  return {
    forms,
    setForms,
    isSubmitting,
    currentErrors,
    handleSubmit,
  };
};