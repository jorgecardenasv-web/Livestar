"use client";

import React from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useThemeSelector } from "../hooks/use-theme-selector";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

export const ThemeSelector: React.FC = () => {
  const { theme, handleThemeChange } = useThemeSelector();

  const options: ThemeOption[] = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  const selectedOption =
    options.find((option) => option.value === theme) || options[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full h-14 justify-between dark:bg-background-subtle">
          <div className="flex items-center space-x-2">
            {React.createElement(selectedOption.icon, {
              size: 20,
              className: "text-primary",
            })}
            <span>{selectedOption.label}</span>
          </div>
          <ChevronDown size={20}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className="flex items-center space-x-2 cursor-pointer px-3 py-2"
          >
            {React.createElement(option.icon, {
              size: 20,
              className: "text-primary",
            })}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
