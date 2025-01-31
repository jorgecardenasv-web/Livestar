"use client";

import { SearchBar } from "@/shared/components/inputs/search-bar";

export const FilterSetion = () => {
  return (
    <div className="flex items-center justify-between gap-2 dark:bg-dark-tremor-background-subtle dark:ring-0">
      <SearchBar placeholder="Buscar por nombre, email..." />
    </div>
  );
};
