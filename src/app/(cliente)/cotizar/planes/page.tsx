import { Plans } from "@/features/plans/components/main/insurance-plans";
import { ModalStorytellingActions } from "@/features/storytelling/components/modals/modal-storytelling-actions";

export default async function PlanesPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Plans />
      <ModalStorytellingActions />
    </main>
  );
}
