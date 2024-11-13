"use client";

import { SearchBar } from "@/shared/components/search-bar";
import { SelectFilter } from "@/shared/components/select-filter";

export const FilterSetion = () => {
  return (
    <div className="flex items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <SearchBar label="Búsqueda" placeholder="Buscar por nombre, email..." />
      <SelectFilter
        label="Filtrar por verificación"
        rowSearch="isVerified"
        statusOptions={[
          { value: "", label: "Todos" },
          { value: "true", label: "Verificado" },
          { value: "false", label: "No Vericado" },
        ]}
      />
    </div>
  );
};
