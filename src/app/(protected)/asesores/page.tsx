import { HeaderAdvisors } from "@/features/advisors/components/header-advisors";
import { getAdvisors } from "@/features/advisors/actions/get-advisors";
import { Advisor } from "@/features/advisors/types/advisor";
import { ListAdvisors } from "@/features/advisors/components/list-advisors";
import { Pagination } from "@/shared/components/pagination";

export default async function Advisors({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const { advisors, totalPages } = await getAdvisors(
    Number(searchParams?.page || 1)
  );

  return (
    <>
      <HeaderAdvisors />
      <ListAdvisors advisors={advisors} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
