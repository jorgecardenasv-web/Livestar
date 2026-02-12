"use client";

import { subMonths } from "date-fns";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export const DateRangePicker = ({
  className,
  onDateRangeChange,
}: DateRangePickerProps) => {
  const today = new Date();
  const oneMonthAgo = subMonths(today, 1);

  const [fromDate, setFromDate] = useState<string>(
    oneMonthAgo.toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState<string>(
    today.toISOString().split("T")[0]
  );

  useEffect(() => {
    // Parsear las fechas correctamente en hora local, no en UTC
    // Cuando el input type="date" devuelve "2026-02-09", debemos interpretar
    // como 9 de febrero en hora local, no como medianoche UTC
    
    let fromDateParsed: Date | undefined = undefined;
    let toDateParsed: Date | undefined = undefined;
    
    if (fromDate) {
      const [year, month, day] = fromDate.split('-').map(Number);
      fromDateParsed = new Date(year, month - 1, day);
    }
    
    if (toDate) {
      const [year, month, day] = toDate.split('-').map(Number);
      toDateParsed = new Date(year, month - 1, day);
    }
    
    const range: DateRange = {
      from: fromDateParsed,
      to: toDateParsed,
    };

    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, toDate]);

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  // Constrain dates: from cannot be after to, and to cannot be before from
  const maxFromDate = toDate || today.toISOString().split("T")[0];
  const minToDate = fromDate;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha Desde */}
        <div className="space-y-2">
          <label
            htmlFor="from-date"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <Calendar className="h-4 w-4 text-primary" />
            Fecha Desde
          </label>
          <div className="relative">
            <input
              id="from-date"
              type="date"
              value={fromDate}
              onChange={handleFromChange}
              max={maxFromDate}
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => e.currentTarget.showPicker()}
              className="relative w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-card text-foreground 
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-200 hover:border-primary/60 hover:shadow-md
                       text-base font-medium cursor-pointer
                       shadow-sm
                       [&::-webkit-calendar-picker-indicator]:cursor-pointer
                       [&::-webkit-calendar-picker-indicator]:w-full
                       [&::-webkit-calendar-picker-indicator]:h-full
                       [&::-webkit-calendar-picker-indicator]:absolute
                       [&::-webkit-calendar-picker-indicator]:inset-0
                       [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Fecha Hasta */}
        <div className="space-y-2">
          <label
            htmlFor="to-date"
            className="text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <Calendar className="h-4 w-4 text-primary" />
            Fecha Hasta
          </label>
          <div className="relative">
            <input
              id="to-date"
              type="date"
              value={toDate}
              onChange={handleToChange}
              min={minToDate}
              max={today.toISOString().split("T")[0]}
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => e.currentTarget.showPicker()}
              className="relative w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-card text-foreground 
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-200 hover:border-primary/60 hover:shadow-md
                       text-base font-medium cursor-pointer
                       shadow-sm
                       [&::-webkit-calendar-picker-indicator]:cursor-pointer
                       [&::-webkit-calendar-picker-indicator]:w-full
                       [&::-webkit-calendar-picker-indicator]:h-full
                       [&::-webkit-calendar-picker-indicator]:absolute
                       [&::-webkit-calendar-picker-indicator]:inset-0
                       [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
