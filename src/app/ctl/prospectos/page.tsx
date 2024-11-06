import { HeaderProspects } from "@/features/prospects/components/header-prospect";
import { ListProspects } from "@/features/prospects/components/list-prospects";
import { ModalProspectActions } from "@/features/prospects/components/modal-prospect-actions";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { getProspects } from "@/features/prospects/loaders/get-prospects";
import { getCurrentUser } from "@/features/session/loaders/get-current-user";
import { SearchBar } from "@/shared/components/search-bar";
import { SelectFilter } from "@/shared/components/select-filter";
import { Prospect } from "@prisma/client";
import { Card, Divider } from "@tremor/react";
import { FilterSetion } from "@/features/prospects/components/filter-section"

const isVerifiedMap: { [key: string]: boolean | undefined } = {
  true: true,
  false: false,
};

interface SearchParams extends Prospect {
  page?: string;
  query: string;
}

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const user = await getCurrentUser();

  const prospects = await getProspects({
    advisorId: user?.role === "ADVISOR" ? user?.id : undefined,
    page: Number(searchParams?.page || 1),
    isVerified: isVerifiedMap[String(searchParams?.isVerified)],
    query: searchParams?.query || "",
  });

  const advisors = await getAdvisors();

  return (
    <>
      <HeaderProspects />
      <Card className="dark:bg-dark-tremor-background-subtle space-y-6">
      <FilterSetion />
        <Divider />
        <ListProspects prospects={prospects} />
      </Card>
      <ModalProspectActions advisors={advisors} prospects={prospects} />
    </>
  );
}
