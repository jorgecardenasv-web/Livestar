import { QuotePageClient } from "./page.client";
import { Breadcrumbs } from "@/shared/components/layout/breadcrumbs";
import { prefix } from "@/features/layout/nav-config/constants";
import { getAdvisors } from "@/features/prospects/loaders/get-advisors";
import { ModalQuoteActions } from "@/features/quote/components/modals/modal-quote-actions";
import { getQuoteByIdLoader } from "@/features/quote/loaders/get-quote-by-id.loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export default async function QuotesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const quote = await getQuoteByIdLoader(id);
  const advisors = await getAdvisors();

  if (!quote) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: "Cotizaciones", href: `${prefix}/cotizaciones` },
            { label: "Cotización no encontrada", href: `${prefix}/cotizaciones/${id}` },
          ]}
        />
        <div className="container mx-auto py-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cotización no encontrada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                La cotización que estás buscando no existe o ha sido eliminada.
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <QuotePageClient quote={quote} />
      <ModalQuoteActions advisors={advisors} />
    </>
  );
}
