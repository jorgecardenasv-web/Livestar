import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { InsuranceQuoteData } from "@/features/quote-summary/types";
import { getInsurancePlanByIdService } from "@/features/plans/services/read/get-insurance-plan-by-id.service";
import { getImage } from "@/shared/services/get-image.service";

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

  let imgCompanyLogo = "";

  if (hasSelectedPlan && selectedPlan.id) {
    const plan = await getInsurancePlanByIdService(selectedPlan.id);
    const companyLogo = plan?.company?.logo;
    if (companyLogo) {
      const logoSrc = await getImage(companyLogo);
      imgCompanyLogo = logoSrc?.base64 ?? "";
    }
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      <QuoteSummary 
        {...(selectedPlan as InsuranceQuoteData)} 
        imgCompanyLogo={imgCompanyLogo}
        quoteId={quoteId} 
      />
    </main>
  );
}
