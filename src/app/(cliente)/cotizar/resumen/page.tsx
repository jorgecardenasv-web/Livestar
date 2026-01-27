import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { getInsuranceState } from "@/features/plans/loaders/get-insurance-status";
import { getProspect } from "@/features/plans/loaders/get-prospect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { InsuranceQuoteData } from "@/features/quote-summary/types";
import { getInsurancePlanByIdService } from "@/features/plans/services/read/get-insurance-plan-by-id.service";
import { getImage } from "@/shared/services/get-image.service";
import { getQuoteByIdService } from "@/features/quote/services/read/get-quote-by-id.service";

export default async function ResumenPage() {
  const { selectedPlan } = await getInsuranceState();
  const { prospect } = await getProspect();
  const cookieStore = await cookies();
  const quoteId = cookieStore.get("createdQuoteId")?.value;

  const hasSelectedPlan = Object.keys(selectedPlan).length > 0;
  const hasProspect = Object.keys(prospect).length > 0;

  // Si hay quoteId, intentar cargar los datos desde la BD en lugar de redirigir
  if (quoteId && (!hasSelectedPlan || !hasProspect)) {
    try {
      const quote = await getQuoteByIdService(quoteId);
      
      if (quote && quote.planData) {
        
        // Obtener el logo primero
        let imgCompanyLogo = "";
        const plan = await getInsurancePlanByIdService(quote.planData.id);
        const companyLogo = plan?.company?.logo;
        if (companyLogo) {
          const logoSrc = await getImage(companyLogo);
          imgCompanyLogo = logoSrc?.base64 ?? "";
        }

        // Construir el objeto de datos desde la quote de la BD
        const dbSelectedPlan: InsuranceQuoteData = {
          id: quote.planData.id,
          company: quote.planData.companyName,
          plan: quote.planData.planTypeName,
          sumInsured: quote.planData.sumInsured,
          deductible: quote.planData.deductible,
          coInsurance: quote.planData.coInsurance,
          coInsuranceCap: quote.planData.coInsuranceCap,
          coverage_fee: quote.totalPrice,
          paymentType: quote.planData.paymentType,
          protectedWho: quote.protectWho || "solo_yo",
          individualPricesJson: quote.planData.individualPricesJson,
          isMultipleString: quote.planData.isMultiple ? "true" : "false",
          deductiblesJson: quote.planData.deductiblesJson,
          isMultipleCoInsurance: quote.planData.isMultipleCoInsurance ? "true" : "false",
          coInsuranceJson: quote.planData.coInsuranceJson,
          coInsuranceCapJson: quote.planData.coInsuranceCapJson,
          imgCompanyLogo: imgCompanyLogo,
        };

        return (
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollToTop />
            <QuoteSummary 
              {...dbSelectedPlan} 
              quoteId={quoteId} 
            />
          </main>
        );
      }
    } catch (error) {
      console.error("Error loading quote from DB:", error);
    }
  }

  // Si no hay selectedPlan ni prospect y tampoco hay quoteId válido, redirigir
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
