"use client"

import type { FC } from "react"
import { ChevronDown, Download, FileText, Eye, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/utils/cn"

interface DropdownProps {
  label?: string
  className?: string
  buttonData?: {
    buttonLabel: string
    action: (props?: any) => void
    icon?: "download" | "view" | "file"
  }[]
}

export const DropdownOptions: FC<DropdownProps> = ({ label = "Más información", className, buttonData = [] }) => {
  const getIcon = (type?: "download" | "view" | "file") => {
    switch (type) {
      case "download":
        return <Download className="h-4 w-4" />
      case "view":
        return <Eye className="h-4 w-4" />
      case "file":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full gap-2 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {label}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] p-1 bg-white">
          {buttonData.map((btn) => (
            <DropdownMenuItem
              key={btn.buttonLabel}
              onClick={btn.action}
              className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-md cursor-pointer data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600"
            >
              {getIcon(btn.icon)}
              <span>{btn.buttonLabel}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

