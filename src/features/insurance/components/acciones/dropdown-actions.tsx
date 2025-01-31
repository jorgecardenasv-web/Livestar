"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Insurance } from "../../types/insurance";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";

export const DropdownActions = ({ insurance }: { insurance: Insurance }) => {
  const { openEditInsuranceModal, openDeleteInsuranceModal } = useInsuranceActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openDeleteInsuranceModal(insurance)}
        >
          Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openEditInsuranceModal(insurance)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}