"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { startQuoteCreation } from "@/features/quote/actions/start-quote-creation";
import { useQuoteRuntimeStore } from "@/shared/store/quote-runtime-store";

export default function EnviandoCotizacionPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const setQuoteId = useQuoteRuntimeStore((s) => s.setQuoteId);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!submitted) {
        formRef.current?.requestSubmit();
        setSubmitted(true);
      }
    }, 100);
    const fallback = setTimeout(() => {
      router.prefetch("/cotizar/resumen");
    }, 500);
    return () => {
      clearTimeout(t);
      clearTimeout(fallback);
    };
  }, [submitted, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
        <h1 className="text-xl font-semibold text-slate-900">Estamos enviando tu cotización</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Esto tomará solo unos segundos. Enseguida te mostramos el resumen.
        </p>
        <p className="mt-2 text-xs text-slate-500">Preparando tu resumen...</p>

        {/* Formulario oculto para ejecutar la Server Action automáticamente */}
        <form
          ref={formRef}
          action={async (fd) => {
            const res = await startQuoteCreation(fd);
            if (res && typeof res === "object" && "success" in res && (res as any).success === false) {
              setErrorMsg((res as any).message || "Hubo un problema creando tu cotización. Intentaremos de nuevo.");
              setSubmitted(false);
              setAttempts((a) => a + 1);
              // Reintento automático limitado
              if (attempts < 2) {
                setTimeout(() => {
                  formRef.current?.requestSubmit();
                  setSubmitted(true);
                }, 1500);
              }
            } else if (res && typeof res === "object" && "success" in res && (res as any).success === true) {
              const id = (res as any).quoteId as string | undefined;
              setQuoteId(id);
              router.replace("/cotizar/resumen");
            }
          }}
          className="hidden"
        >
          <button type="submit" aria-hidden="true">Crear</button>
        </form>

        {errorMsg && (
          <div className="mt-4 text-sm text-destructive/80">
            {attempts >= 2 ? (
              <span>No pudimos completar tu cotización. Lo estamos intentando nuevamente.</span>
            ) : (
              <span>{errorMsg}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}