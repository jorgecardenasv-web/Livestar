"use client";

import React, { useRef, useEffect } from "react";
import { Sun, Moon, Monitor, ChevronDown, ChevronUp } from "lucide-react";
import { useThemeSelector } from "../hooks/use-theme-selector";

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

export const ThemeSelector: React.FC = () => {
  const { theme, isOpen, toggleDropdown, closeDropdown, handleThemeChange } =
    useThemeSelector();
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  const options: ThemeOption[] = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  const selectedOption =
    options.find((option) => option.value === theme) || options[2];

  return (
    <div className="relative w-full md:h-12" ref={selectRef}>
      <button
        onClick={toggleDropdown}
        className="ring-tremor-brand h-[48px] w-full flex items-center justify-between px-3.5 border rounded-tremor-default
                   bg-tremor-background dark:bg-dark-tremor-background-subtle
                   text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis
                   ring-1 dark:border-dark-tremor-border"
      >
        <div className="flex items-center space-x-2">
          <selectedOption.icon size={20} className="text-tremor-brand" />
          <span className="hidden md:inline">{selectedOption.label}</span>
        </div>
        <span className="text-xs hidden md:inline">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div
          className="absolute w-[150px] sm:w-full mt-2 md:mt-0 md:mb-2 z-50
                     top-full md:top-auto md:bottom-full right-0 sm:right-auto sm:left-0
                     bg-tremor-background-muted ring-1 ring-tremor-ring dark:ring-0 dark:bg-dark-tremor-background
                     border-tremor-border dark:border-dark-tremor-border
                     rounded-tremor-default shadow-tremor-dropdown dark:shadow-dark-tremor-dropdown"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              className="w-full flex items-center space-x-2 p-2 text-left
                         text-tremor-content dark:bg-dark-tremor-background dark:text-dark-tremor-brand-emphasis 
                         hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis 
                         dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis"
            >
              <option.icon size={20} className="text-tremor-brand" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
