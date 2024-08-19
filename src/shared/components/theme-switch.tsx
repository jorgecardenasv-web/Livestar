"use client";

import React, { useEffect, useState, useRef, FC } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, ChevronDown, ChevronUp } from "lucide-react";

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

export const ThemeSelect: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const options: ThemeOption[] = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  const selectedOption =
    options.find((option) => option.value === theme) || options[2];

  const handleSelectChange = (value: string): void => {
    setTheme(value);
    setIsOpen(false);
  };

  const getIconColor = (optionValue: string): string => {
    if (theme === "dark") {
      return optionValue === "dark"
        ? "text-tremor-brand-emphasis"
        : "text-tremor-brand";
    } else {
      return "text-sky-600";
    }
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[48px] w-full flex items-center justify-between px-3.5 border rounded-tremor-default
                   bg-tremor-background dark:bg-dark-tremor-background-subtle
                   text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis
                   border-tremor-border dark:border-dark-tremor-border"
      >
        <div className="flex items-center space-x-2">
          <selectedOption.icon
            size={20}
            className={getIconColor(selectedOption.value)}
          />
          <span className="hidden sm:inline">{selectedOption.label}</span>
        </div>
        <span className="text-xs hidden sm:inline">
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
              onClick={() => handleSelectChange(option.value)}
              className="w-full flex items-center space-x-2 p-2 text-left
                         text-tremor-content dark:bg-dark-tremor-background dark:text-dark-tremor-brand-emphasis 
                         hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis 
                         dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis"
            >
              <option.icon size={20} className={getIconColor(option.value)} />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};