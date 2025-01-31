import { FilterConfig } from "@/shared/hooks/use-table-filters";

export const filters: FilterConfig[] = [
  {
    key: "estado",
    label: "Estado",
    type: "radio",
    options: [
      { label: "Activo", value: "ACTIVO" },
      { label: "Inactivo", value: "INACTIVO" },
    ],
  },
];
