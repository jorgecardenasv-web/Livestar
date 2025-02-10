import { QuotePageClient } from "./page.client";
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs";
import { prefix } from "@/features/layout/nav-config/constants";
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
      <QuotePageClient quote={quote!} />
      <ModalQuoteActions advisors={advisors} />
    </>
  );
}
