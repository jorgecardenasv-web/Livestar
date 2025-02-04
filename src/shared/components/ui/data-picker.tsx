"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Label } from "./label";

interface DatePickerProps {
  value?: Date;
  label: string;
  placeholder?: string;
  onValueChange: (value: Date | undefined) => void;
  error?: string;
  darkLabel?: boolean;
}

export function DatePicker({
  value,
  label,
  placeholder = "Selecciona una fecha",
  onValueChange,
  error,
  darkLabel,
}: DatePickerProps) {
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
            <CalendarIcon className="mr-2" />
            {value ? format(value, "PPP", { locale: es }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onValueChange}
            initialFocus
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>
      <span className="text-sm text-red-600">{error}</span>
    </div>
  );
}
