"use client";

import { formatDate } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { prefix } from "@/shared/utils/constants";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { useProspectActions } from "../../hooks/use-prospect-actions";
import { Button } from "@/shared/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Prospect } from "../../types/prospect";

export const ListProspects = ({ prospects }: { prospects: Prospect[] }) => {
  const { push } = useRouter();
  const { openEditProspectModal } = useProspectActions();

  return (
    <div className="w-full">
      {prospects && prospects.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo electrónico</TableHead>
              <TableHead>Verificación</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Asesor asignado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {prospects.map((prospect) => (
              <TableRow
                key={prospect.id}
                className="cursor-pointer hover:bg-tremor-brand-muted hover:text-tremor-brand-emphasis dark:hover:bg-dark-tremor-brand-subtle dark:hover:text-dark-tremor-brand-emphasis"
              >
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {prospect.name}
                </TableCell>
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {prospect.email}
                </TableCell>
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {prospect.isVerified ? (
                    <Badge variant="success">Verificado</Badge>
                  ) : (
                    <Badge variant="destructive">No verificado</Badge>
                  )}
                </TableCell>
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {formatDate(prospect.createdAt)}
                </TableCell>
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {prospect.user?.name}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => openEditProspectModal(prospect)}
                  >
                    <Ellipsis size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No hay prospectos</p>
      )}
    </div>
  );
};
