"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error en la página de administradores:", error);
  }, [error]);

  return (
    <div className="p-6 space-y-4">
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AlertTriangle className="w-12 h-12 text-destructive/70 mb-4" />
          <h2 className="text-2xl font-semibold text-destructive/70 mb-4">
            ¡Ups! Encontramos un problema
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            No te preocupes, estas cosas pasan. Puedes intentar nuevamente haciendo clic en el botón de abajo.
          </p>
          <Button
            variant="default"
            onClick={reset}
          >
            Volver a intentar
          </Button>
        </div>
      </Card>
    </div>
  );
}
