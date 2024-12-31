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
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";

export const PlansList = ({ plans }: { plans: Plan[] }) => {
  return (
    <div className="w-full">
      {plans && plans.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Asseguradora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={plan.company.logo} />
                    <AvatarFallback>{plan.company.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  {plan.status === PlanStatus.ACTIVE ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="destructive">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(plan.createdAt)}</TableCell>
                <TableCell className="flex gap-1">
                  {/* <Button onClick={() => openEditInsuranceModal(insurance)}>
                <Pencil size={20} />
              </Button> */}
                  <Button
                    variant="destructive"
                    onClick={() => console.log(plan)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">No hay planes.</p>
      )}
    </div>
  );
};
