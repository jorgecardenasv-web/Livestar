import { useState, useEffect } from "react";

import { useSearchParamsBuilder } from "./use-search-params-builder";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: "radio" | "switch";
  options?: FilterOption[];
}

export function useTableFilters(filters: FilterConfig[] = []) {
  const { updateMultipleParams, searchParams } = useSearchParamsBuilder();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialFilters = (filters || []).reduce(
      (acc, filter) => {
        acc[filter.key] = searchParams.get(filter.key) || "";
        return acc;
      },
      {} as Record<string, string>
    );
    setLocalFilters(initialFilters);
  }, [filters, searchParams]);

  useEffect(() => {
    const count = Object.values(localFilters).filter(
      (value) => value !== ""
    ).length;
    setActiveFilterCount(count);
  }, [localFilters]);

  const applyFilters = () => {
    updateMultipleParams(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = filters.reduce(
      (acc, filter) => {
        acc[filter.key] = "";
        return acc;
      },
      {} as Record<string, string>
    );

    const queryParam = searchParams.get("query");
    if (queryParam) {
      emptyFilters["query"] = queryParam;
    }

    setLocalFilters(emptyFilters);

    const newParams = new URLSearchParams();
    if (queryParam) {
      newParams.set("query", queryParam);
    }
    updateMultipleParams(emptyFilters);
  };

  const updateFilter = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    isOpen,
    setIsOpen,
    activeFilterCount,
    currentFilters: localFilters,
    applyFilters,
    resetFilters,
    updateFilter,
  };
}
