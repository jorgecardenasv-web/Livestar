import { LoadingSpinner } from "@/shared/components/ui/loading-spinner";

export default function Loading() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <LoadingSpinner />
    </main>
  );
}
