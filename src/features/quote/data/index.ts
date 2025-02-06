import { FilterConfig } from "@/shared/hooks/use-table-filters";
import { QuoteStatus } from "@prisma/client";
import { Question } from "../types";

interface QuoteStatusOptions {
  label: string;
  value: QuoteStatus;
}

export const quoteStatus: QuoteStatusOptions[] = [
  {
    label: "Nuevo",
    value: "NUEVO",
  },
  {
    label: "Contactado",
    value: "CONTACTADO",
  },
  {
    label: "En progreso",
    value: "EN_PROGRESO",
  },
  {
    label: "Cerrado",
    value: "CERRADO",
  },
];

export const genderOptions = [
  {
    label: "Hombre",
    value: "hombre",
  },
  {
    label: "Mujer",
    value: "mujer",
  },
];

export const whoOptions = [
  {
    label: "Solo yo",
    value: "solo_yo",
  },
  {
    label: "Mi pareja y yo",
    value: "mi_pareja_y_yo",
  },
  {
    label: "Mi familia",
    value: "familia",
  },
  {
    label: "Mis hijos y yo",
    value: "mis_hijos_y_yo",
  },
  {
    label: "Solo mis hijos",
    value: "solo_mis_hijos",
  },
  {
    label: "Mis padres",
    value: "mis_padres",
  },
  {
    label: "Otro(s)",
    value: "otros",
  },
];

export const eventTypeOptions = [
  {
    label: "Enfermedad",
    value: "enfermedad",
  },
  {
    label: "Accidente",
    value: "accidente",
  },
  {
    label: "Maternidad",
    value: "maternidad",
  },
  {
    label: "Estético",
    value: "estetico",
  },
];

export const filters: FilterConfig[] = [
  {
    key: "status",
    label: "Estado",
    type: "radio",
    options: quoteStatus,
  },
];

export const QUESTIONS: Question[] = [
  {
    id: 0,
    text: "¿Algún solicitante padece o ha padecido alguna enfermedad como hipertensión arterial, infarto, hepatitis, diabetes, epilepsia, esclerosis, fiebre reumática, SIDA, cáncer, tumores, COVID-19; enfermedades mentales, congénitas, inmunológicas u otras de tipo renal, pulmonar, neurológico o cardiovascular?",
  },
  {
    id: 1,
    text: "¿Algún Solicitante ha sido hospitalizado o le han hecho alguna cirugía por cualquier enfermedad, accidente, alteración congénita, reconstructiva o estética?",
  },
  {
    id: 2,
    text: "¿Algún Solicitante padece de alguna lesión, enfermedad, padecimiento o trastorno de salud no referida en la pregunta número 1?",
  },
  {
    id: 3,
    text: "¿Algún Solicitante está en tratamiento de cualquier tipo o tiene programada atención médica o quirúrgica?",
  },
];
