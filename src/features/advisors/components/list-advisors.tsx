"use client";
import React, { FC } from "react";
import {
  Card,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Button,
} from "@tremor/react";

import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useAdvisorActions } from "../hooks/use-advisor-actions";

import { SelectFilter } from "@/shared/components/SelectFilter";
import { formatDate } from "@/shared/utils";
interface ListAdvisorsProps {
  advisors: Advisor[];
}

const statusOptions = [
  { value: "", label: "Todos" },
  { value: UserStatus.ACTIVE, label: "Activo" },
  { value: UserStatus.INACTIVE, label: "Inactivo" },
];

export const ListAdvisors: FC<ListAdvisorsProps> = ({ advisors }) => {
  const { openDeleteAdvisorModal, openEditAdvisorModal } = useAdvisorActions();

  return (
    <>
      <div className="mb-4">
        <SelectFilter
          statusOptions={statusOptions}
          rowSearch={"status"}
          placeholder="Filtrar por estado"
        />
      </div>
      <Card className="dark:bg-dark-tremor-background-subtle">
        <Table>
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Rol</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Fecha de creación</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advisors.map((advisor: Advisor) => (
              <TableRow key={advisor.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {advisor.name}
                </TableCell>
                <TableCell>{advisor.email}</TableCell>
                <TableCell>{`${advisor.role
                  .charAt(0)
                  .toUpperCase()}${advisor.role
                  .slice(1)
                  .toLowerCase()}`}</TableCell>
                <TableCell>
                  {advisor.status === UserStatus.ACTIVE ? (
                    <Badge color="green">Activo</Badge>
                  ) : (
                    <Badge color="red">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(advisor.createdAt)}</TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    color="red"
                    onClick={() => openDeleteAdvisorModal(advisor)}
                  >
                    <Trash2 size={20} />
                  </Button>
                  <Button
                    color="blue"
                    onClick={() => openEditAdvisorModal(advisor)}
                  >
                    <Pencil size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};
