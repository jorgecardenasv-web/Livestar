"use client";

import { Select, SelectItem } from "@tremor/react";
import React from "react";
import { useSearchParamsBuilder } from "../hooks/use-search-params-builder";

interface StatusOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  statusOptions: StatusOption[];
  label: string;
  rowSearch: string;
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  statusOptions,
  rowSearch,
  placeholder = "Todos",
  label,
}) => {
  const { handleSearchParams, searchParams } =
    useSearchParamsBuilder(rowSearch);

  return (
    <div className="w-full space-y-2">
      <label className="text-[13px] text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {label}:
      </label>
      <Select
        className="max-w-xs"
        onValueChange={handleSearchParams}
        placeholder={placeholder}
        defaultValue={searchParams.get(rowSearch) ?? ""}
      >
        {statusOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-brand-subtle focus:bg-tremor-background dark:focus:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content"
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
