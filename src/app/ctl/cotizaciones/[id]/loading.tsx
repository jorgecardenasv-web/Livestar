import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";

export default function LoadingProspectPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-32" />
      </div>

      <Card className="bg-white dark:bg-zinc-800">
        <CardContent>
          <div className="space-y-6 py-4">
            <Skeleton className="h-7 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-zinc-800">
        <CardContent>
          <div className="space-y-6 py-4">
            <Skeleton className="h-7 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Skeleton className="h-14 w-32" />
      </div>
    </div>
  );
}
