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
import { SearchBar } from "@/shared/components/inputs/search-bar";
import { Pagination } from "@/shared/components/pagination/pagination";
import { Params } from "@/app/ctl/planes/tipo-de-planes/page";
import { getPlanTypes } from "../../loaders/get-plan-types";
import { TableFilters } from "@/shared/components/tables/table-filters";
import { filters } from "../../data/table-filters.data";
import { DropdownActions } from "../acciones/plan-type-dropdown-actions";

export const ListPlanTypes = async ({ params }: { params: Params }) => {
  const {
    data: {
      items,
      totalItems,
      totalPages,
      itemsPerPage,
      currentPage
    },
  } = await getPlanTypes(params);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-2">
        <SearchBar placeholder="Buscar tipos de plan por nombre" />
        <TableFilters filters={filters} />
      </div>
      <div className="rounded-md border">
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
            {items.length > 0 ? (
              items.map((planType) => (
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
                  <TableCell className="flex gap-1">
                    <DropdownActions planType={planType} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center"
                >
                  No hay prospectos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        itemName="Tipos de plane"
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
