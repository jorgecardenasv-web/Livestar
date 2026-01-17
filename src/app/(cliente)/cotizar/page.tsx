import { redirect } from "next/navigation";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { GetQuoteForm } from "@/features/quote/components/forms/get-quote-form";
import { ScrollToTop } from "@/shared/components/scroll-to-top";

export default async function QuotePage() {
  const { prospect } = await getProspect();
  const { selectedPlan } = await getInsuranceState();

  const hasProspect = Object.keys(prospect).length > 0;
  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;

  if (hasProspect && !hasSelectedPlan) {
    redirect("/cotizar/planes");
  }

  if (hasSelectedPlan && hasProspect) {
    redirect("/cotizar/resumen");
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
      <ScrollToTop />
      <div className="max-w-3xl mx-auto">
        <GetQuoteForm prospect={undefined} />
      </div>
    </main>
  );
}
