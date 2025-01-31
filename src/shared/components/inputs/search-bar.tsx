"use client";

import { Search } from "lucide-react";
import { FC } from "react";
import { useDebouncedCallback } from "use-debounce";

import { TextInput } from "../ui/text-input";
import { useSearchParamsBuilder } from "@/shared/hooks/use-search-params-builder";


interface SearchBarProps {
  placeholder: string;
  iconPosition?: "start" | "end";
}

export const SearchBar: FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  iconPosition = "start",
}) => {
  const { handleSearchParams, searchParams } = useSearchParamsBuilder();

  const handleSearch = useDebouncedCallback((term) => {
    handleSearchParams("query", term);
  }, 300);

  return (
    <TextInput
      icon={<Search className="h-5 w-5 text-muted-foreground" />}
      iconPosition={iconPosition}
      defaultValue={searchParams.get("query") ?? ""}
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  );
};
