"use client";
import { FC } from "react";

import { Advisor } from "../types/advisor";
import { UserStatus } from "@prisma/client";
import { Pencil, Trash2 } from "lucide-react";
import { useAdvisorActions } from "../hooks/use-advisor-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

interface ListAdvisorsProps {
  advisors: Advisor[];
}

export const ListAdvisors: FC<ListAdvisorsProps> = ({ advisors }) => {
  const { openDeleteAdvisorModal, openEditAdvisorModal } = useAdvisorActions();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advisors.map((advisor: Advisor) => (
          <TableRow key={advisor.id}>
            <TableCell>{advisor.name}</TableCell>
            <TableCell>{advisor.email}</TableCell>
            <TableCell>
              {advisor.status === UserStatus.ACTIVE ? (
                <Badge color="success">Activo</Badge>
              ) : (
                <Badge color="destructive">Inactivo</Badge>
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
