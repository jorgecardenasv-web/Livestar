import { Plans } from "@/features/plans/components/main/insurance-plans";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";
import { ScrollToTop } from "@/shared/components/scroll-to-top";

export default async function PlanesPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollToTop />
      <Plans />
      <ModalStorytellingActions />
    </main>
  );
}
