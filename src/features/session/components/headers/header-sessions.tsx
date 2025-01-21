"use client";

import { Card, CardContent } from "@/shared/components/ui/card";

export const HeaderSessions = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between gap-2 p-6">
        <section>
          <h3 className="font-semibold text-lg text-foreground">Sesiones</h3>
          <p className="mt-1 text-sm text-muted-foreground leading-6">
            Visión general de todos las sessiones activas en tu organización.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};
