import { formatDate } from "@/shared/utils";
import { CheckCircle2, XCircle } from "lucide-react";

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
import { getCurrentUser } from "@/features/session/loaders/get-current-user";
import { Params } from "@/app/ctl/cotizaciones/page";
import { getQuotes } from "../../loaders/get-quotes.loader";
import { Badge } from "@/shared/components/ui/badge";
import { TableFilters } from "@/shared/components/tables/table-filters";
import { filters } from "../../data";

const quoteStatusVariants = {
  NUEVO: "default",
  CONTACTADO: "secondary",
  EN_PROGRESO: "outline",
  CERRADO: "success",
} as const;

export const ListQuotes = async ({ params }: {
  params: Params
}) => {

  try {
    const user = await getCurrentUser();

    const { data } = await getQuotes({
      ...params,
      userId: user?.role === "ASESOR" ? user?.id : undefined,
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
          <SearchBar placeholder="Buscar por nombre, correo electrónico, whatsapp..." />
          <TableFilters filters={filters} />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo electrónico</TableHead>
                <TableHead>Whatsapp</TableHead>
                <TableHead>Fecha de creación</TableHead>
                <TableHead>Asesor asignado</TableHead>
                <TableHead>Verificado</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.length > 0 ? (
                items.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>{quote.prospect?.name}</TableCell>
                    <TableCell>{quote.prospect?.email}</TableCell>
                    <TableCell>{quote.prospect?.whatsapp}</TableCell>
                    <TableCell>{formatDate(quote.createdAt)}</TableCell>
                    <TableCell>{quote.user?.name}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {quote.prospect?.isVerified ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-slate-300" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={quoteStatusVariants[quote.status]}
                      >
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownActions quote={quote} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center"
                  >
                    No hay cotizaciones disponibles
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
  } catch (error) {
    console.error("Error loading quotes:", error);
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar las cotizaciones. Por favor, intente recargar la página.
      </div>
    );
  }
};
