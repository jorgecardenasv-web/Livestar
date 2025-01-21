"use client";

import { Role, UserStatus } from "@prisma/client";
import { formatDate } from "@/shared/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { User } from "../../types/user";

const statusOptions = [
  { value: "", label: "Todos" },
  { value: UserStatus.ACTIVO, label: "Activo" },
  { value: UserStatus.INACTIVO, label: "Inactivo" },
];

const rolOptions = [
  { value: "", label: "Todos" },
  { value: Role.ADMIN, label: "Admin" },
  { value: Role.ASESOR, label: "Asesor" },
];

export const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div className="w-full">
      {users && users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo electrónico</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.role.charAt(0).toUpperCase()}${user.role
                  .slice(1)
                  .toLowerCase()}`}</TableCell>
                <TableCell>
                  {user.status === UserStatus.ACTIVO ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="destructive">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No hay usuarios.</p>
      )}
    </div>
  );
};
