import { Skeleton } from "@/shared/components/ui/skeleton";

export const PaymentSelectorSkeleton = () => {
  return (
    <div className="flex gap-4 mt-2">
      {[1, 2].map((i) => (
        <Skeleton
          key={i}
          className="h-10 w-24"
        />
      ))}
    </div>
  );
};
