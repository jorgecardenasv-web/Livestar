import { HeaderProspects } from "@/features/prospects/components/header-prospect";
import { ListProspects } from "@/features/prospects/components/list-prospects";
import { ModalProspectActions } from "@/features/prospects/components/modal-prospect-actions";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { getProspects } from "@/features/prospects/loaders/get-prospects";
import { getCurrentUser } from "@/features/session/loaders/get-current-user";
import { Prospect } from "@prisma/client";
import { FilterSetion } from "@/features/prospects/components/filter-section";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

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
      <Card>
        <CardContent className="space-y-6 p-6">
          <FilterSetion />
          <Separator />
          <ListProspects prospects={prospects} />
        </CardContent>
      </Card>
      <ModalProspectActions advisors={advisors} />
    </>
  );
}
