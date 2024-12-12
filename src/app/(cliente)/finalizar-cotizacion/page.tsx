import { QuoteSummary } from "@/features/quote-summary/components/quote-summary";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";
import { getProspect } from "@/features/insurance-plans/actions/insurance-actions";
import { notFound } from "next/navigation";
import { MedicalInformation } from "@/features/insurance-quote/components/medical-information";
import { getProspectById } from "@/features/prospects/loaders/get-prospect-by-id";
import QuoteFinalizationClientPage from "./page.client";

export default async function QuoteFinalizationPage() {
  const propsectCookie = await getProspect()
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
