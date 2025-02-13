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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Params } from "@/app/ctl/planes/page";
import { getPlans } from "../../loaders/get-plans";
import { Pagination } from "@/shared/components/pagination/pagination";
import { SearchBar } from "@/shared/components/inputs/search-bar";
import { DropdownActions } from "../acciones/plan-dropdown-actions";
import { TableFilters } from "@/shared/components/tables/table-filters";
import { filters } from "../../data/table-filters.data";
import { getImage } from "@/shared/services/get-image.service";

export const PlansList = async ({ params }: { params: Params }) => {
  const { data: {
    items,
    totalItems,
    totalPages,
    itemsPerPage,
    currentPage
  } } = await getPlans(params);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-2">
        <SearchBar placeholder="Buscar planes por nombre" />
        <TableFilters filters={filters} />
      </div>
      <div className="rounded-md border">
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
            {items.length > 0 ? (
              items.map(async (plan) => {
                const logo = await getImage(plan.company.logo);
                return (
                  <TableRow key={plan.id} className="cursor-pointer">
                    <TableCell>
                      {plan.planType.name}
                    </TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={logo?.base64} />
                        <AvatarFallback>{plan.company.name}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      {plan.status === PlanStatus.ACTIVO ? (
                        <Badge variant="success">Activo</Badge>
                      ) : (
                        <Badge variant="destructive">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(plan.createdAt)}
                    </TableCell>
                    <TableCell
                      className="flex gap-1"
                    >
                      <DropdownActions plan={plan} />
                    </TableCell>
                  </TableRow>
                )
              })
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
        itemName="Plan"
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
