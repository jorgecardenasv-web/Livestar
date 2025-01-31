"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { prefix } from "@/shared/utils/constants";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useProspectActions } from "../../hooks/use-prospect-actions";
import { useRouter } from "next/navigation";
import { Prospect } from "@prisma/client";

export const DropdownActions = ({ prospect }: { prospect: Prospect }) => {

  const { push } = useRouter();
  const { openEditProspectModal } = useProspectActions();

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
          onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
        >
          Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openEditProspectModal(prospect)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}