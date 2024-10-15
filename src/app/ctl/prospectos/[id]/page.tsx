import { getProspectById } from "@/features/prospects/loaders/get-prospect-by-id";
import { ProspectClientPage } from "./page.client";
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs";
import { prefix } from "@/shared/utils/constants";
import { ProspectActions } from "@/features/prospects/components/prospect-actions";
import { Prospect } from "@/features/prospects/types/prospect";
import { ModalProspectActions } from "@/features/prospects/components/modal-prospect-actions";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";

export default async function ProspectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const prospect = await getProspectById(id);
  const advisors = await getAdvisors();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Breadcrumbs
          items={[
            { label: "Prospectos", href: `${prefix}/prospectos` },
            {
              label: "Detalle de Prospecto",
              href: `${prefix}/prospectos/${id}`,
            },
          ]}
        />
        <ProspectActions prospect={prospect as Prospect} />
      </div>
      <ProspectClientPage prospect={prospect} />
      <ModalProspectActions advisors={advisors} />
    </>
  );
}
