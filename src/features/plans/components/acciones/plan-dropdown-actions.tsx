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
import { Plan } from "../../types/plan";
import { usePlanActions } from "../../hooks/use-plan-actions";
import { prefix } from "@/features/layout/nav-config/constants";
import Link from "next/link";

export const DropdownActions = ({ plan }: { plan: Plan }) => {
  const { openDeletePlanModal } = usePlanActions();

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
          className="cursor-pointer w-full"
          asChild
        >
          <Link href={`${prefix}/planes/${plan.id}`} className="w-full">
            Ver detalles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openDeletePlanModal(plan)}
        >
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}