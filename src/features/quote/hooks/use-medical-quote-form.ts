import { useState, useCallback, useMemo } from "react";
import {
  FormDataMedical,
  Question,
  HealthCondition,
} from "@/features/quote/types";
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
  questions.map((question) => ({
    [`answer-${question.id}`]: "No",
    healthConditions: [{ ...INITIAL_HEALTH_CONDITION }],
  }));

interface UseMedicalQuoteFormProps {
  questions: Question[];
}

export const useMedicalQuoteForm = ({
  questions,
}: UseMedicalQuoteFormProps) => {
  // Este hook ha sido reemplazado por la versión unificada en use-get-quote-form.
};
