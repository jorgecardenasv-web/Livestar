"use client";

import { addYears, format, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useEffect, useState } from "react";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export const DateRangePicker = ({
  className,
  onDateRangeChange,
}: DateRangePickerProps) => {
  const today = new Date();
  const oneMonthAgo = subMonths(today, 1);
  const fiveYearsAgo = addYears(today, -5);

  const [date, setDate] = useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });

  useEffect(() => {
    if (onDateRangeChange) {
      onDateRangeChange(date);
    }
  }, [date, onDateRangeChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d MMM yy", { locale: es })} -{" "}
                  {format(date.to, "d MMM yy", { locale: es })}
                </>
              ) : (
                format(date.from, "d MMM yy", { locale: es })
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={oneMonthAgo}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              if (onDateRangeChange) {
                onDateRangeChange(newDate);
              }
            }}
            numberOfMonths={2}
            locale={es}
            modifiers={{ today: new Date() }}
            modifiersStyles={{
              today: {
                fontWeight: "bold",
                border: "2px solid currentColor",
              },
            }}
            fromDate={fiveYearsAgo}
            toDate={today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
