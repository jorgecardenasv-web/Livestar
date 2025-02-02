import { QuotePageClient } from "./page.client";
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs";
import { prefix } from "@/shared/utils/constants";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { ModalQuoteActions } from "@/features/quote/components/modals/modal-quote-actions";
import { getQuoteByIdLoader } from "@/features/quote/loaders/get-quote-by-id.loader";

export default async function QuotesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const quote = await getQuoteByIdLoader(id);
  const advisors = await getAdvisors();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Breadcrumbs
          items={[
            { label: "Cotizaciones", href: `${prefix}/cotizaciones` },
            {
              label: "Detalle de cotización",
              href: `${prefix}/cotizaciones/${id}`,
            },
          ]}
        />
      </div>
      <QuotePageClient quote={quote!} />
      <ModalQuoteActions advisors={advisors} />
    </>
  );
}
