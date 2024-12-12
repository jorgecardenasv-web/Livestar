"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  PowerIcon,
  UserCircle,
  PenIcon as UserPen,
} from "lucide-react";
import { signout } from "@/features/auth/actions/signout";
import { prefix } from "@/shared/utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";

interface DropdownProps {
  label?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ label }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="w-full h-14 justify-between dark:bg-background border border-primary"
        >
          <div className="flex items-center space-x-2">
            <UserCircle size={20} className="text-sky-600 dark:text-primary" />
            <span className="hidden md:inline">{label}</span>
          </div>
          <ChevronDown size={20} className="hidden md:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuItem>
          <Link
            href={`${prefix}/perfil`}
            className="flex items-center space-x-2"
          >
            <UserPen size={20} />
            <span>Mi Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signout}>
            <button className="flex items-center space-x-2 w-full text-left">
              <PowerIcon size={20} />
              <span>Cerrar sesión</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
