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

interface ListAdvisorsProps {
  advisors: Advisor[];
}

export const ListAdvisors: FC<ListAdvisorsProps> = ({ advisors }) => {
  const { openDeleteAdvisorModal, openEditAdvisorModal } = useAdvisorActions();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Acciones</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {advisors.map((advisor: Advisor) => (
          <TableRow key={advisor.id}>
            <TableCell>{advisor.name}</TableCell>
            <TableCell>{advisor.email}</TableCell>
            <TableCell>
              {advisor.status === UserStatus.ACTIVE ? (
                <Badge color="green">Activo</Badge>
              ) : (
                <Badge color="red">Inactivo</Badge>
              )}
            </TableCell>
            <TableCell className="flex gap-1">
              <Button
                color="blue"
                variant="secondary"
                onClick={() => openEditAdvisorModal(advisor)}
              >
                <Pencil size={20} />
              </Button>
              <Button
                color="red"
                variant="secondary"
                onClick={() => openDeleteAdvisorModal(advisor)}
              >
                <Trash2 size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
