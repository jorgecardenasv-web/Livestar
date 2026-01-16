"use client";

import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { useQuoteRuntimeStore } from "@/shared/store/quote-runtime-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InsuranceQuoteData } from "@/features/quote-summary/types";

export default function ResumenPage() {
  const router = useRouter();
  const { quoteId, selectedPlanData } = useQuoteRuntimeStore();

  useEffect(() => {
    if (!quoteId || !selectedPlanData) {
      router.replace("/cotizar");
    }
  }, [quoteId, selectedPlanData, router]);

  if (!quoteId || !selectedPlanData) {
    return null;
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      {/* Garantizar el tipo requerido por QuoteSummary */}
      <QuoteSummary {...(selectedPlanData as InsuranceQuoteData)} />
    </main>
  );
}
