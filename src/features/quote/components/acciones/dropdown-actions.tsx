"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { prefix } from "@/features/layout/nav-config/constants";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useQuoteActions } from "../../hooks/use-quote-actions";
import { useRouter } from "next/navigation";
import { Quote } from "@prisma/client";
import Link from "next/link";

export const DropdownActions = ({ quote }: { quote: Omit<Quote, "medicalHistories"> }) => {

  const { push } = useRouter();
  const { openEditQuoteModal } = useQuoteActions();

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
          asChild
        >
          <Link href={`${prefix}/cotizaciones/${quote.id}`}>
            Ver detalles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => openEditQuoteModal(quote)}
        >
          Editar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}