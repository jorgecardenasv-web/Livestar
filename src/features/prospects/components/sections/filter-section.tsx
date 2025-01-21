"use client";

import { SearchBar } from "@/shared/components/inputs/search-bar";
import { SelectFilter } from "@/shared/components/selectors/select-filter";

export const FilterSetion = () => {
  return (
    <div className="flex items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <SearchBar label="Búsqueda" placeholder="Buscar por nombre, email..." />
      <SelectFilter
        label="Filtrar por verificación"
        rowSearch="isVerified"
        statusOptions={[
          { value: "todos", label: "Todos" },
          { value: "true", label: "Verificado" },
          { value: "false", label: "No Vericado" },
        ]}
      />
    </div>
  );
};
