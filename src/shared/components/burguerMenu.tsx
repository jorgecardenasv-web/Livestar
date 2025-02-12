"use client";

import React, { FC, ReactElement } from "react";
import Link from "next/link";
import {
  ChevronDown,
  PowerIcon,
  UserCircle,
  PenIcon as UserPen,
} from "lucide-react";
import { logout } from "@/features/auth/actions/logout";
import { prefix } from "@/features/layout/nav-config/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";

interface DropdownProps {
  label?: string;
  className?: string;
  buttonData?: {
    buttonLabel?: string;
    action?: (props?: any) => void;
  }[];
}

export const BurguerMenu: FC<DropdownProps> = ({
  label,
  className,
  buttonData,
}) => {
  return (
    <div className={`${className ? className : ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-14 justify-between dark:bg-background-subtle border border-primary"
          >
            <div className="flex items-center space-x-2">
              <span>{label}</span>
            </div>
            <ChevronDown size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {buttonData &&
            buttonData.map((btn: any) => {
              return (
                <DropdownMenuItem className="border border-blue-400 ">
                  <button
                    className="flex items-center space-x-2 w-full text-left"
                    onClick={() => btn.action()}
                  >
                    {btn.buttonLabel}
                  </button>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
