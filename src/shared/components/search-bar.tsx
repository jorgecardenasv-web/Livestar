"use client";

import { TextInput } from "@tremor/react";
import { Search } from "lucide-react";
import { useSearchParamsBuilder } from "../hooks/use-search-params-builder";
import { useDebouncedCallback } from "use-debounce";

export const SearchBar = ({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) => {
  const { handleSearchParams, searchParams } =
    useSearchParamsBuilder("query");

  const handleSearch = useDebouncedCallback((term) => {
    handleSearchParams(term);
  }, 300);

  return (
    <div className="w-full space-y-2">
      <label className="text-[13px] text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {label}:
      </label>
      <TextInput
        icon={Search}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") ?? ""}
      />
    </div>
  );
};
