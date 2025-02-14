"use client";

import React, { FC } from "react";
import { ChevronDown } from "lucide-react";
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
                <DropdownMenuItem className="border border-blue-400" key={btn.buttonLabel}>
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
