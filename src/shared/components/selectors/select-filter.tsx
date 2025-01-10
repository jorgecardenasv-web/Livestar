"use client";

import { useSearchParamsBuilder } from "../../hooks/use-search-params-builder";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
        defaultValue={searchParams.get(rowSearch) ?? "todos"}
        onValueChange={(value) => handleSearchParams(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statusOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
