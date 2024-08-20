'use client';

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, PowerIcon, UserPen } from "lucide-react";
import { logout } from "@/features/auth/actions/auth";
import Link from "next/link";

interface DropdownProps {
  label?: string;
  icon?: React.ElementType;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dark:ring-1 ring-tremor-brand h-[48px] w-full flex items-center justify-between px-3.5 border rounded-tremor-default
                   bg-tremor-background dark:bg-dark-tremor-background-subtle
                   text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis
                   border-tremor-border dark:border-dark-tremor-border"
      >
        <div className="flex items-center space-x-2">
          {Icon && (
            <Icon size={20} className="text-sky-600 dark:text-tremor-brand" />
          )}
          <span className="hidden md:inline">{label}</span>
        </div>
        <span className="text-xs hidden md:inline">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div
          className="absolute w-[150px] mt-2 md:mb-0 md:mt-2 z-50
                     top-full md:bottom-auto md:top-full right-0
                     bg-tremor-background-muted ring-1 ring-tremor-ring dark:ring-0 dark:bg-dark-tremor-background
                     border-tremor-border dark:border-dark-tremor-border
                     rounded-tremor-default shadow-tremor-dropdown dark:shadow-dark-tremor-dropdown"
        >
          <Link href="/perfil">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-start space-x-2 p-2
                         text-tremor-content dark:bg-dark-tremor-background dark:text-dark-tremor-brand-emphasis 
                         hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis 
                         dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis"
            >
              <UserPen size={20} />
              <span>Mi Perfil</span>
            </button>
          </Link>
          <form action={logout}>
            <button
              className="w-full flex items-center justify-start space-x-2 p-2
                         text-tremor-content dark:bg-dark-tremor-background dark:text-dark-tremor-brand-emphasis 
                         hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis 
                         dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis"
            >
              <PowerIcon size={20} />
              <span>Cerrar sesión</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};