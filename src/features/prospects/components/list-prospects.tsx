"use client";

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Prospect } from "../types/prospect";
import { formatDate } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { prefix } from "@/shared/utils/constants";
import { ProspectActions } from "./prospect-actions";

export const ListProspects = ({ prospects }: { prospects: Prospect[] }) => {
  const { push } = useRouter();

  return (
    <div className="w-full">
      {prospects && prospects.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Correo electrónico</TableHeaderCell>
              <TableHeaderCell>Verificación</TableHeaderCell>
              <TableHeaderCell>Fecha de creación</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Asesor asignado</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

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
                    <Badge color="green">Verificado</Badge>
                  ) : (
                    <Badge color="red">No verificado</Badge>
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
