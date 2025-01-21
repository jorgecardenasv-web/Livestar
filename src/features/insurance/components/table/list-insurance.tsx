"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { FC } from "react";
import { Insurance } from "../../types/insurance";
import { formatDate } from "@/shared/utils";
import { Badge } from "@/shared/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";

interface ListInsuranceProps {
  insurances: Insurance[];
}

export const ListInsurance: FC<ListInsuranceProps> = ({ insurances }) => {
  const { openDeleteInsuranceModal } = useInsuranceActions();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha de creación</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {insurances.map((insurance) => (
          <TableRow key={insurance.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={insurance.logo} />
                <AvatarFallback>{insurance.name}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{insurance.name}</TableCell>
            <TableCell>
              {insurance.status ? (
                <Badge variant="success">Activo</Badge>
              ) : (
                <Badge variant="destructive">Inactivo</Badge>
              )}
            </TableCell>
            <TableCell>{formatDate(insurance.createdAt)}</TableCell>
            <TableCell className="flex gap-1">
              {/* <Button onClick={() => openEditInsuranceModal(insurance)}>
                <Pencil size={20} />
              </Button> */}
              <Button
                variant="destructive"
                onClick={() => openDeleteInsuranceModal(insurance)}
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
