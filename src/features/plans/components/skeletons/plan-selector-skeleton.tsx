import { Skeleton } from "@/shared/components/ui/skeleton";

export const PlanSelectorSkeleton = () => {
  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-12 w-32"
          />
        ))}
      </div>
    </div>
  );
};
