"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface MonthYearPickerProps {
  value?: Date;
  label: string;
  placeholder?: string;
  onValueChange: (value: Date | undefined) => void;
  error?: string;
  darkLabel?: boolean;
  minYear?: number;
  maxYear?: number;
}

const months = [
  { value: 0, label: "Enero" },
  { value: 1, label: "Febrero" },
  { value: 2, label: "Marzo" },
  { value: 3, label: "Abril" },
  { value: 4, label: "Mayo" },
  { value: 5, label: "Junio" },
  { value: 6, label: "Julio" },
  { value: 7, label: "Agosto" },
  { value: 8, label: "Septiembre" },
  { value: 9, label: "Octubre" },
  { value: 10, label: "Noviembre" },
  { value: 11, label: "Diciembre" },
];

export function MonthYearPicker({
  value,
  label,
  placeholder = "Selecciona mes y año",
  onValueChange,
  error,
  darkLabel,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: MonthYearPickerProps) {
  const [selectedMonth, setSelectedMonth] = React.useState<number | undefined>(
    value ? value.getMonth() : undefined
  );
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(
    value ? value.getFullYear() : undefined
  );

  // Generar array de años
  const years = React.useMemo(() => {
    const yearArray = [];
    for (let year = maxYear; year >= minYear; year--) {
      yearArray.push(year);
    }
    return yearArray;
  }, [minYear, maxYear]);

  // Actualizar estado cuando cambia el valor externo
  React.useEffect(() => {
    if (value) {
      setSelectedMonth(value.getMonth());
      setSelectedYear(value.getFullYear());
    } else {
      setSelectedMonth(undefined);
      setSelectedYear(undefined);
    }
  }, [value]);

  const handleMonthChange = (month: string) => {
    const monthValue = parseInt(month);
    setSelectedMonth(monthValue);

    if (selectedYear !== undefined) {
      const newDate = new Date(selectedYear, monthValue, 1);
      onValueChange(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const yearValue = parseInt(year);
    setSelectedYear(yearValue);

    if (selectedMonth !== undefined) {
      const newDate = new Date(yearValue, selectedMonth, 1);
      onValueChange(newDate);
    }
  };

  const displayValue = value
    ? format(value, "MMMM yyyy", { locale: es })
    : placeholder;

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label
          htmlFor={label}
          className={cn(darkLabel ? "text-white" : "", label ? "mt-4" : "")}
        >
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left px-3 py-2",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{displayValue}</span>
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-4" align="start">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">Mes</Label>
              <Select
                value={selectedMonth?.toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label className="text-sm font-medium">Año</Label>
              <Select
                value={selectedYear?.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona año" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}