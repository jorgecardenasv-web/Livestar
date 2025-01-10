"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ProgressBar } from "@/shared/components/ui/progress-bar";


export const CardExample = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Sales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-semibold">$71,465</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </div>
          <ProgressBar value={32} />
        </div>
      </CardContent>
    </Card>
  );
};
