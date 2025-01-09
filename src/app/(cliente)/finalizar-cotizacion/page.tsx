import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getProspect } from "@/features/insurance-plans/loaders/get-prospect";
import { getProspectById } from "@/features/prospects/loaders/get-prospect-by-id";
import QuoteFinalizationClientPage from "./page.client";

export default async function QuoteFinalizationPage() {
  const propsectCookie = await getProspect();
  const prospect = await getProspectById(propsectCookie.id);

  return (
    <>
      <HeaderSecondary />
      <div className="py-14 px-5">
        <QuoteFinalizationClientPage prospect={prospect} />
      </div>
    </>
  );
}
