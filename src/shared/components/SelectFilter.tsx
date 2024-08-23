import { Select, SelectItem } from "@tremor/react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface StatusOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  statusOptions: StatusOption[];
  rowSearch: string;
  placeholder?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  statusOptions,
  rowSearch,
  placeholder = "Selecciona una opción",
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
    <>
      <Select
        className="max-w-xs bg-tremor-background dark:bg-dark-tremor-background-subtle border-tremor-border dark:border-dark-tremor-border text-tremor-content dark:text-dark-tremor-content shadow-sm ring-1 ring-tremor-border dark:ring-dark-tremor-border rounded-md p-2"
        onValueChange={handleStatusChange}
        placeholder={placeholder}
        defaultValue=""
      >
        {statusOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-tremor-background-subtle dark:hover:bg-dark-tremor-background focus:bg-tremor-background dark:focus:bg-dark-tremor-background text-tremor-content dark:text-dark-tremor-content"
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};
