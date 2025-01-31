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
import { PlanType } from "@prisma/client";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";

export const DropdownActions = ({ planType }: { planType: PlanType }) => {
  const { openDeletePlanModal, openEditPlanTypeModal } = usePlanTypeActions();

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
          onClick={() => openDeletePlanModal(planType)}
        >
          Eliminar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openEditPlanTypeModal(planType)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}