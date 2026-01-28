"use client";

import { useState } from "react";
import { Session } from "../../types/session";
import { formatDate } from "@/shared/utils";
import { invalidateSession } from "../../actions/invalidate-session";
import { UsersIcon } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";

export const ListSessions = ({ sessions }: { sessions: Session[] }) => {
  const [filter, setFilter] = useState<"ALL" | "ADMIN" | "ASESOR">("ALL");

  const handleCloseSession = (sessionId: string) => {
    invalidateSession(sessionId);
  };

  const filteredSessions = sessions.filter(
    (session) => filter === "ALL" || session.user.role === filter
  );

  const getRoleBadge = (role: "ADMIN" | "ASESOR") => {
    const badges = {
      ADMIN: <Badge>{role}</Badge>,
      ASESOR: <Badge variant="outline">{role}</Badge>,
    };

    return badges[role];
  };

  return (
    <Card className="mt-6">
      <CardContent>
        {filteredSessions.length > 0 ? (
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado de Sesión</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.user.name}</TableCell>
                  <TableCell>{session.user.email}</TableCell>
                  <TableCell>{getRoleBadge(session.user.role)}</TableCell>
                  <TableCell>
                    <Badge variant={session.active ? "success" : "secondary"}>
                      {session.active ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span>{formatDate(session.createdAt)}</span>
                  </TableCell>
                  <TableCell>
                    <form>
                      <Button
                        size="sm"
                        variant="outline"
                        color="red"
                        type="button"
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
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center text-center p-8 bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-md">
            <UsersIcon size={40} />
            <h2 className="mt-4">No hay sesiones activas</h2>
            <span className="mt-2 text-gray-500">
              Actualmente no hay sesiones activas que coincidan con los
              criterios de filtrado.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
