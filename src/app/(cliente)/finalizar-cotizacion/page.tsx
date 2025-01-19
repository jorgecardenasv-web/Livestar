import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getProspect } from "@/features/insurance-plans/loaders/get-prospect";
import { getProspectById } from "@/features/prospects/loaders/get-prospect-by-id";
import { QuoteFinalizationForm } from "@/features/quote/components/forms/quote-finalization-form";

export default async function QuoteFinalizationPage() {
  const propsectCookie = await getProspect();
  const prospect = await getProspectById(propsectCookie.id);

  return (
    <>
      <HeaderSecondary />
      <div className="py-14 px-5">
        <QuoteFinalizationForm prospect={prospect} />
      </div>
    </>
  );
}
