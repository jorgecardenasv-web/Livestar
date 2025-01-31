import { UserStatus } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Advisor } from "../../types/advisor";
import { getAdvisors } from "../../loaders/get-advisors";
import { SearchBar } from "@/shared/components/inputs/search-bar";
import { DropdownActions } from "../acciones/dropdown-actions";
import { TableFilters } from "@/shared/components/tables/table-filters";
import { filters } from "../../data/table-filters.data";
import { Pagination } from "@/shared/components/pagination/pagination";
import { Params } from "@/app/ctl/asesores/page";

export const ListAdvisors = async ({ params }: {
  params: Params
}) => {
  const { data } =
    await getAdvisors(params);

  const {
    items,
    itemsPerPage,
    totalItems,
    totalPages,
    currentPage,
  } = data;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-2">
        <SearchBar placeholder="Buscar prospectos por nombre, correo electrónico" />
        <TableFilters filters={filters} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length > 0 ? (
              items.map((advisor: Advisor) => (
                <TableRow key={advisor.id}>
                  <TableCell>{advisor.name}</TableCell>
                  <TableCell>{advisor.email}</TableCell>
                  <TableCell>
                    {advisor.status === UserStatus.ACTIVO ? (
                      <Badge variant="success">Activo</Badge>
                    ) : (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <DropdownActions
                      advisor={advisor}
                    />
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
        itemName="Asesor"
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
