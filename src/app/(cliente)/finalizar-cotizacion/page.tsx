import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { getProspectById } from "@/features/prospects/loaders/get-prospect-by-id";
import { QuoteFinalizationForm } from "@/features/quote/components/forms/quote-finalization-form";

export default async function QuoteFinalizationPage() {
  const prospect = await getProspect();

  return (
    <>
      <HeaderSecondary />
      <div className="py-14 px-5">
        <QuoteFinalizationForm prospect={prospect} />
      </div>
    </>
  );
}
