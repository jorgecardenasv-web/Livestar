"use client";

import { PlanStatus } from "@prisma/client";
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
import { Plan } from "../../types/plan";

export const PlansList = ({ plans }: { plans: Plan[] }) => {
  return (
    <div className="w-full">
      {plans && plans.length > 0 ? (
        <Card>
          <CardContent className="space-y-6 p-6">
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
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.name}</TableCell>
                    <TableCell>
                      {plan.status === PlanStatus.ACTIVE ? (
                        <Badge variant="success">Activo</Badge>
                      ) : (
                        <Badge variant="destructive">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(plan.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center">No hay usuarios.</p>
      )}
    </div>
  );
};
