'use client'

import { Select, SelectItem } from "@tremor/react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface StatusOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  statusOptions: StatusOption[];
  filterName: string;
  rowSearch: string;
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  statusOptions,
  rowSearch,
  placeholder = "Todos",
  filterName,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(rowSearch, value);
    } else {
      params.delete(rowSearch);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-sm text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {filterName}:
      </label>
      <Select
        className="max-w-xs"
        onValueChange={handleStatusChange}
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
