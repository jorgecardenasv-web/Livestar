"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Card, CardContent } from "@/shared/components/ui/card";

export default function Loading() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl bg-muted/50 p-5">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="flex w-48 items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-36" />
              </div>
              <Skeleton className="h-10 w-36" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-80" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl bg-muted/50 p-5">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-52 mb-4" />
            <Skeleton className="h-60 w-full" />
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl bg-muted/50 p-5">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
