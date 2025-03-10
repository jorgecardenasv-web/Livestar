import { InsuranceFlow } from "@/features/storytelling/components/main/insurance-flow-view";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { ScrollToTop } from "@/shared/components/scroll-to-top";

export default async function FlowPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      <InsuranceFlow />
      <ModalStorytellingActions />
    </main>
  );
}
