import { formatDate } from "@/shared/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { SearchBar } from "@/shared/components/inputs/search-bar";
// import { TableFilters } from "@/shared/components/tables/table-filters";
// import { filters } from "../data/table-filters.data";
import { DropdownActions } from "../acciones/dropdown-actions";
import { Pagination } from "@/shared/components/pagination/pagination";
import { getProspects } from "@/features/prospects/loaders/get-prospects";
import { getCurrentUser } from "@/features/session/loaders/get-current-user";
import { Params } from "@/app/ctl/prospectos/page";

export const ListProspects = async ({ params }: {
  params: Params
}) => {

  const user = await getCurrentUser();

  const { data } = await getProspects({
    advisorId: user?.role === "ASESOR" ? user?.id : undefined,
    page: Number(params?.page || 1),
    query: params?.query || "",
  });

  const {
    items,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage
  } = data

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center py-2">
        <SearchBar placeholder="Buscar prospectos por nombre, correo electrónico" />
        {/* <TableFilters filters={filters} /> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo electrónico</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Asesor asignado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length > 0 ? (
              items.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>{prospect.name}</TableCell>
                  <TableCell>{prospect.email}</TableCell>
                  <TableCell>{formatDate(prospect.createdAt)}</TableCell>
                  <TableCell>{prospect.user?.name}</TableCell>
                  <TableCell>
                    <DropdownActions prospect={prospect} />
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
        itemName="Prospecto"
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
