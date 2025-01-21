"use client";

import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { FC } from "react";
import { useSearchParamsBuilder } from "@/shared/hooks/use-search-params-builder";
import { TextInput } from "../ui/text-input";

interface SearchBarProps {
  label: string;
  placeholder?: string;
  iconPosition?: "start" | "end";
}

export const SearchBar: FC<SearchBarProps> = ({
  label,
  placeholder = "Buscar...",
  iconPosition = "start",
}) => {
  const { handleSearchParams, searchParams } = useSearchParamsBuilder("query");

  const handleSearch = useDebouncedCallback((term) => {
    handleSearchParams(term);
  }, 300);

  return (
    <div className="w-full space-y-2">
      <label className="text-[13px] text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {label}:
      </label>
      <TextInput
        icon={<Search className="h-5 w-5 text-muted-foreground" />}
        iconPosition={iconPosition}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
