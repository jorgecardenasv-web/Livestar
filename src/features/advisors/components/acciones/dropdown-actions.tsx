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
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { Advisor } from "../../types/advisor";

export const DropdownActions = ({ advisor }: { advisor: Advisor }) => {
  const { openEditAdvisorModal, openDeleteAdvisorModal } = useAdvisorActions();

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
          onClick={() => openDeleteAdvisorModal(advisor)}
        >
          Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openEditAdvisorModal(advisor)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}