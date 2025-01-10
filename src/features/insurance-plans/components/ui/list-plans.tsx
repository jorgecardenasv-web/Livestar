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
import { Badge } from "@/shared/components/ui/badge";
import { Plan } from "../../types/plan";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from 'lucide-react';
import { prefix } from "@/shared/utils/constants";
import { useRouter } from "next/navigation";

interface PlansListProps {
  plans: Plan[];
  companyLogos: { [key: string]: string };
}

export const PlansList = ({ plans, companyLogos }: PlansListProps) => {
  const { push } = useRouter();

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
              <TableRow key={plan.id} className="cursor-pointer">
                <TableCell onClick={() => push(`${prefix}/planes/${plan.id}`)}>
                  {plan.name}
                </TableCell>
                <TableCell onClick={() => push(`${prefix}/planes/${plan.id}`)}>
                  <Avatar>
                    <AvatarImage src={companyLogos[plan.id]} />
                    <AvatarFallback>{plan.company.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell onClick={() => push(`${prefix}/planes/${plan.id}`)}>
                  {plan.status === PlanStatus.ACTIVE ? (
                    <Badge variant="success">Activo</Badge>
                  ) : (
                    <Badge variant="destructive">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell onClick={() => push(`${prefix}/planes/${plan.id}`)}>
                  {formatDate(plan.createdAt)}
                </TableCell>
                <TableCell
                  className="flex gap-1"
                  onClick={() => push(`${prefix}/planes/${plan.id}`)}
                >
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(plan);
                    }}
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

