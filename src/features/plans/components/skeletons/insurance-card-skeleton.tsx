import { Skeleton } from "@/shared/components/ui/skeleton";

export const InsuranceCardSkeleton = () => {
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden w-72">
      <div className="p-6 space-y-6">
        {/* Logo y precios */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-32 h-16 mb-4" />
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-32 h-8" />
        </div>

        {/* Info items */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-3">
              <Skeleton className="w-10 h-10" />
              <div className="flex-1">
                <Skeleton className="w-20 h-3 mb-2" />
                <Skeleton className="w-24 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Botón */}
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
};
