import { HeaderAdvisors } from "@/features/advisors/components/header-advisors";
import { getAdvisors } from "@/features/advisors/actions/get-advisors";
import { ListAdvisors } from "@/features/advisors/components/list-advisors";
import { Pagination } from "@/shared/components/pagination";
import { ModalAdvisorActions } from "@/features/advisors/components/modal-advisor-actions";
import { Card } from "@tremor/react";
import { SelectFilter } from "@/shared/components/select-filter";
import { UserStatus } from "@prisma/client";

const statusOptions = [
  { value: "", label: "Todos" },
  { value: UserStatus.ACTIVE, label: "Activo" },
  { value: UserStatus.INACTIVE, label: "Inactivo" },
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
      <Card className="dark:bg-dark-tremor-background-subtle space-y-6">
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
      </Card>

      <ModalAdvisorActions />
    </>
  );
}
