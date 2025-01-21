import { getAdvisors } from "@/features/advisors/loaders/get-advisors";
import { Pagination } from "@/shared/components/pagination/pagination";
import { ModalAdvisorActions } from "@/features/advisors/components/modals/modal-advisor-actions";
import { SelectFilter } from "@/shared/components/selectors/select-filter";
import { UserStatus } from "@prisma/client";
import { Card, CardContent } from "@/shared/components/ui/card";
import { HeaderAdvisors } from "@/features/advisors/components/headers/header-advisors";
import { ListAdvisors } from "@/features/advisors/components/tables/list-advisors";

const statusOptions = [
  { value: "todos", label: "Todos" },
  { value: UserStatus.ACTIVO, label: "Activo" },
  { value: UserStatus.INACTIVO, label: "Inactivo" },
];

export default async function Advisors({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    status?: string;
  };
}) {
  const { advisors, totalPages, totalAdvisors, advisorsPerPage } =
    await getAdvisors({
      page: Number(searchParams?.page || 1),
      status: searchParams?.status,
    });

  return (
    <>
      <HeaderAdvisors />
      {/* Filtros */}
      <Card>
        <CardContent className="space-y-6 p-6">
          <SelectFilter
            statusOptions={statusOptions}
            rowSearch={"status"}
            placeholder="Todos"
            label="Filtrar por Estado"
          />
          <ListAdvisors advisors={advisors} />
          <Pagination
            totalPages={totalPages}
            totalItems={totalAdvisors}
            itemsPerPage={advisorsPerPage}
            itemName="Asesor"
          />
        </CardContent>
      </Card>

      <ModalAdvisorActions />
    </>
  );
}
