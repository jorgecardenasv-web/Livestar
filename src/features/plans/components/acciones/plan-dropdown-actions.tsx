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
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import { Plan } from "../../types/plan";
import { usePlanActions } from "../../hooks/use-plan-actions";
import { prefix } from "@/features/layout/nav-config/constants";
import Link from "next/link";

export const DropdownActions = ({ plan }: { plan: Plan }) => {
  const { openDeletePlanModal } = usePlanActions();

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
          asChild
        >
          <Link href={`${prefix}/planes/${plan.id}`} className="flex items-center w-full">
            <Eye className="h-4 w-4 text-emerald-600" />
            <span>Ver detalles</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center gap-2 py-2 text-destructive hover:bg-red-50 focus:text-destructive transition-colors"
          onClick={() => openDeletePlanModal(plan)}
        >
          <Trash2 className="h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}