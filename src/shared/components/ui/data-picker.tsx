"use client";

import * as React from "react";
import { format } from "date-fns";
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

// Props para manejar datos del formulario
interface DatePickerDemoProps {
  value?: Date;
  title: string;
  placeholder?: string;
  onValueChange: (value: Date | undefined) => void;
  error?: string;
}

export function DatePickerDemo({
  value,
  title,
  placeholder = "Pick a date",
  onValueChange,
  error,
}: DatePickerDemoProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={title} className={`mt-4`}>
        {title}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onValueChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span className="text-sm text-red-600">{error}</span>
    </div>
  );
}
