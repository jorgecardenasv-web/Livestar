import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { getInsurancePlanById } from "@/features/plans/loaders/get-insurance-plan-by-id";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { HeaderSecondary } from "@/shared/components/layout/header-secondary";

export default async function ResumenPage() {
  const cookieStore = cookies();
  const quoteValue = cookieStore.get("createdQuote")?.value;
  const quoteParsed = quoteValue ? JSON.parse(quoteValue) : null;

  if (!quoteParsed || !quoteParsed.planData) {
    return (
      <>
        <HeaderSecondary />
        <main className="min-h-[calc(100vh-120rem)] flex items-center justify-center bg-gray-50 py-20">
          <ScrollToTop />
          <div className="max-w-5xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl lg:shadow-sm lg:border border-gray-200 overflow-hidden flex flex-col items-center justify-center py-16 gap-6">
              <span className="text-2xl font-bold text-gray-900">No hay datos de resumen</span>
              <Link href="/cotizar">
                <Button variant="default" size="lg" className="px-8">
                  Iniciar cotización
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const prospectValue = cookieStore.get("prospect")?.value
  const prospectParsed = quoteValue ? JSON.parse(prospectValue!) : null;

  const plan = await getInsurancePlanById(quoteParsed.planData.id);
  const planData = {
    deductible: quoteParsed.deductible,
    ...quoteParsed.planData,
    imgCompanyLogo: plan.company.logo,
  };

  const prospect = {
    quoteId: quoteParsed.id,
    prospectId: quoteParsed.prospectId,
    ...prospectParsed,
  }

  return (
    <>
      <HeaderSecondary />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollToTop />
        <QuoteSummary {...planData} prospect={prospect} />
      </main>
    </>
  );
}
