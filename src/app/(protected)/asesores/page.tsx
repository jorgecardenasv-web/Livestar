import { HeaderAdvisors } from "@/features/advisors/components/header-advisors";
import { getAdvisors } from "@/features/advisors/actions/get-advisors";
import { ListAdvisors } from "@/features/advisors/components/list-advisors";
import { Pagination } from "@/shared/components/pagination";
import { ModalAdvisorActions } from "@/features/advisors/components/modal-advisor-actions";

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
      <ListAdvisors advisors={advisors} />
      <Pagination
        totalPages={totalPages}
        totalItems={totalAdvisors}
        itemsPerPage={advisorsPerPage}
        itemName="Asesor"
      />
      <ModalAdvisorActions />
    </>
  );
}
