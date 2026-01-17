import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { InsuranceQuoteData } from "@/features/quote-summary/types";

export default async function ResumenPage() {
  const { selectedPlan } = await getInsuranceState();
  const { prospect } = await getProspect();
  const cookieStore = await cookies();
  const quoteId = cookieStore.get("createdQuoteId")?.value;

  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;
  const hasProspect = Object.keys(prospect).length > 0;

  if (!hasSelectedPlan || !hasProspect) {
    redirect("/cotizar");
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      <QuoteSummary 
        {...(selectedPlan as InsuranceQuoteData)} 
        quoteId={quoteId} 
      />
    </main>
  );
}
