"use client";

import { Filter, X } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { FilterConfig, useTableFilters } from "@/shared/hooks/use-table-filters";

interface TableFiltersProps {
  filters?: FilterConfig[];
}

export function TableFilters({ filters = [] }: TableFiltersProps) {
  const {
    isOpen,
    setIsOpen,
    activeFilterCount,
    currentFilters,
    applyFilters,
    resetFilters,
    updateFilter,
  } = useTableFilters(filters);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="h-9 px-3 lg:px-4 flex items-center gap-2"
          >
            <Filter size={16} />
            <span className="text-sm font-medium">Filtros</span>
            {activeFilterCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 px-1.5 text-xs font-medium"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[280px] p-4"
        >
          <div className="space-y-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">
                  {filter.label}
                </h4>
                {filter.type === "radio" && (
                  <RadioGroup
                    onValueChange={(value) => updateFilter(filter.key, value)}
                    value={currentFilters[filter.key]}
                    className="gap-2"
                  >
                    {filter.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`${filter.key}-${option.value}`}
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor={`${filter.key}-${option.value}`}
                          className="text-sm"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value=""
                        id={`${filter.key}-todos`}
                        className="h-4 w-4"
                      />
                      <Label
                        htmlFor={`${filter.key}-todos`}
                        className="text-sm"
                      >
                        Todos
                      </Label>
                    </div>
                  </RadioGroup>
                )}
                {filter.type === "switch" && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={filter.key}
                      onCheckedChange={(checked) => updateFilter(filter.key, checked ? "true" : "")}
                      checked={currentFilters[filter.key] === "true"}
                      className="h-6 w-12"
                    />
                    <Label
                      htmlFor={filter.key}
                      className="text-sm"
                    >
                      {filter.label}
                    </Label>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="px-3"
                size="sm"
              >
                <X className="mr-1 h-3 w-3" />
                Resetear
              </Button>
              <Button
                onClick={applyFilters}
                className="px-3 ml-auto"
                size="sm"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
