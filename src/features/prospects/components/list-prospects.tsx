"use client";

import { Prospect } from "../types/prospect";
import { formatDate } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { prefix } from "@/shared/utils/constants";
import { ProspectActions } from "./prospect-actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";

export const ListProspects = ({ prospects }: { prospects: Prospect[] }) => {
  const { push } = useRouter();

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
              <TableHead>Estado</TableHead>
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
                    <Badge color="success">Verificado</Badge>
                  ) : (
                    <Badge color="destructive">No verificado</Badge>
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
                  <Badge color="blue">{prospect.status}</Badge>
                </TableCell>
                <TableCell
                  onClick={() => push(`${prefix}/prospectos/${prospect.id}`)}
                >
                  {prospect.user?.name}
                </TableCell>
                <TableCell>
                  <ProspectActions prospect={prospect} />
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
