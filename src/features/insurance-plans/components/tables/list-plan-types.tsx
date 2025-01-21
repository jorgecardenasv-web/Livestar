"use client";

import { PlanStatus, PlanType } from "@prisma/client";
import { formatDate } from "@/shared/utils";
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
import { Ellipsis } from "lucide-react";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";

interface ListPlansProps {
  planTypes: PlanType[];
}

export const ListPlanTypes = ({ planTypes }: ListPlansProps) => {
  const { openEditPlanTypeModal } = usePlanTypeActions();
  return (
    <div className="w-full">
      {planTypes && planTypes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planTypes.map((planType) => (
              <TableRow key={planType.id} className="cursor-pointer">
                <TableCell>{planType.name}</TableCell>
                <TableCell>
                  {planType.status === PlanStatus.ACTIVO ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="destructive">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(planType.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => openEditPlanTypeModal(planType)}
                  >
                    <Ellipsis size={20} />
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
