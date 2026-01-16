import { GetQuoteForm } from "@/features/quote/components/forms/get-quote-form";
import { ScrollToTop } from "@/shared/components/scroll-to-top";

export default async function FlowPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ScrollToTop />
      <div className="max-w-3xl mx-auto">
        <GetQuoteForm prospect={undefined} />
      </div>
    </main>
  );
}
