"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Insurance } from "../../types/insurance";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";

export const DropdownActions = ({ insurance }: { insurance: Insurance }) => {
  const { openEditInsuranceModal, openDeleteInsuranceModal } = useInsuranceActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 transition-colors">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 shadow-lg border-slate-200">
        <DropdownMenuLabel className="font-semibold text-sm">Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2 py-2 hover:bg-slate-50 transition-colors"
          onClick={() => openEditInsuranceModal(insurance)}
        >
          <Edit className="h-4 w-4 text-primary" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2 py-2 text-destructive hover:bg-red-50 focus:text-destructive transition-colors"
          onClick={() => openDeleteInsuranceModal(insurance)}
        >
          <Trash2 className="h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}