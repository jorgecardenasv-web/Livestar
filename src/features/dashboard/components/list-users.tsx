import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { User } from "../types/user";
import { UserStatus } from "@prisma/client";

export const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div className="w-full">
      {users && users.length > 0 ? (
        <Card className="dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Correo electrónico</TableHeaderCell>
                <TableHeaderCell>Rol</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Fecha de creación</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.role.charAt(0).toUpperCase()}${user.role
                    .slice(1)
                    .toLowerCase()}`}</TableCell>
                  <TableCell>{user.status === UserStatus.ACTIVE ? <Badge color="green">Activo</Badge> : <Badge color="red">Inactivo</Badge>}</TableCell>
                  <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <p className="text-center">No hay usuarios</p>
      )}
    </div>
  );
};
