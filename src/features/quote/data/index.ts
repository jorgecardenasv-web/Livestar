import { FilterConfig } from "@/shared/hooks/use-table-filters";
import { QuoteStatus } from "@prisma/client";

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
