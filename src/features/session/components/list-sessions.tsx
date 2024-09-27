"use client";

import { useState } from "react";
import { Card, Title, Text } from "@tremor/react";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";
import { Badge } from "@tremor/react";
import { Button } from "@tremor/react";
import { Select, SelectItem } from "@tremor/react";
import { Session } from "../types/session";
import { User } from "@prisma/client";
import { formatDate } from "@/shared/utils";
import { invalidateSession } from "../actions/invalidate-session";

export const ListSessions = ({ sessions }: { sessions: Session[] }) => {
  const [filter, setFilter] = useState<"ALL" | "ADMIN" | "ADVISOR">("ALL");

  const handleCloseSession = (sessionId: string) => {
    console.log(`Cerrando sesión: ${sessionId}`);
    invalidateSession(sessionId);
  };

  const filteredSessions = sessions.filter(
    (session) => filter === "ALL" || session.user.role === filter
  );

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "ADMIN":
        return <Badge color="red">{role}</Badge>;
      case "ADVISOR":
        return <Badge color="blue">{role}</Badge>;
    }
  };

  return (
    <Card className="mt-6">
      <div className="md:flex justify-between">
        <Title>Sesiones Activas</Title>
        <div className="mt-4 md:mt-0">
          <Select
            onValueChange={(value) =>
              setFilter(value as "ALL" | "ADMIN" | "ADVISOR")
            }
            placeholder="Filtrar por rol"
          >
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="ADVISOR">Advisor</SelectItem>
          </Select>
        </div>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Usuario</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Rol</TableHeaderCell>
            <TableHeaderCell>Estado de Sesión</TableHeaderCell>
            <TableHeaderCell>Fecha de Inicio</TableHeaderCell>
            <TableHeaderCell>Acción</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.user.name}</TableCell>
              <TableCell>{session.user.email}</TableCell>
              <TableCell>{getRoleBadge(session.user.role)}</TableCell>
              <TableCell>
                <Badge color={session.active ? "green" : "gray"}>
                  {session.active ? "Activa" : "Inactiva"}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{formatDate(session.createdAt)}</Text>
              </TableCell>
              <TableCell>
                <form>
                  <Button
                    size="xs"
                    variant="secondary"
                    color="red"
                    onClick={() => handleCloseSession(session.id)}
                  >
                    Cerrar Sesión
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
