"use client";

import { QuoteSummary } from "@/features/quote-summary/components/main/quote-summary";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { ScrollToTop } from "@/shared/components/scroll-to-top";
import { useQuoteRuntimeStore } from "@/shared/store/quote-runtime-store";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InsuranceQuoteData } from "@/features/quote-summary/types";

export default function ResumenPage() {
  const router = useRouter();
  const { quoteId, selectedPlanData } = useQuoteRuntimeStore();

  useEffect(() => {
    if (!quoteId || !selectedPlanData) {
      router.prefetch("/cotizar");
    }
  }, [quoteId, selectedPlanData, router]);

  if (!quoteId || !selectedPlanData) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid place-items-center">
        <ScrollToTop />
        <div className="p-6">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center w-full min-h-[300px] text-center space-y-4">
              <h2 className="text-xl font-semibold">No hay una cotización activa</h2>
              <p className="text-muted-foreground">Tu sesión de cotización no está disponible. Puedes iniciar una nueva ahora.</p>
              <Button size="lg" className="text-lg font-semibold" onClick={() => router.replace("/cotizar")}>Ir a cotizar</Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      {/* Garantizar el tipo requerido por QuoteSummary */}
      <QuoteSummary {...(selectedPlanData as InsuranceQuoteData)} />
      <ModalStorytellingActions />
    </main>
  );
}
