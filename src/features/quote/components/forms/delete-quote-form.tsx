"use client";

import { SubmitButton } from "@/shared/components/ui/submit-button";
import { Callout } from "@/shared/components/ui/callout";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useQuoteActions } from "../../hooks/use-quote-actions";
import { formatCurrency } from "@/shared/utils";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useActionState } from "react";
import { deleteQuote } from "../../actions/delete-quote";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const DeleteQuoteForm = () => {
  const { handleCancel, quote } = useQuoteActions();
  const { showNotification } = useNotificationStore();
  const router = useRouter();

  const deleteQuoteWithId = deleteQuote.bind(null, quote?.id);

  const [state, formAction] = useActionState(deleteQuoteWithId, {
    message: "",
    success: false
  });

  useEffect(() => {
    if (state.success) {
      handleCancel();
      showNotification(state.message, "success");
      router.refresh();
    }

    if (!state.success && state.message) {
      showNotification(state.message, "error");
    }
  }, [state.success, state.message, handleCancel, showNotification, router]);

  return (
    <>
      <Callout title="Cotización a eliminar" className="mt-4" variant="error">
        <div className="flex flex-row gap-2 mb-1">
          <p>Prospecto:</p>
          <p className="font-semibold">{quote?.prospect?.name} {quote?.prospect?.lastName}</p>
        </div>
        {quote?.planData && (
          <>
            <div className="flex flex-row gap-2 mb-1">
              <p>Plan:</p>
              <p className="font-semibold">{quote.planData?.planTypeName}</p>
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <p>Compañía:</p>
              <p className="font-semibold">{quote.planData?.companyName}</p>
            </div>
          </>
        )}
        <div className="flex flex-row gap-2 mb-1">
          <p>Precio Total:</p>
          <p className="font-semibold">{formatCurrency(quote?.totalPrice)}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>Fecha de creación:</p>
          <p className="font-semibold">
            {new Date(quote?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Callout>

      <div className="mt-8 w-full flex flex-row gap-2">
        <form action={formAction} className="flex-1">
          <SubmitButton
            label="Eliminar"
            labelPending="Eliminando..."
            className="w-full bg-destructive"
          />
        </form>
        <Button
          variant="outline"
          type="button"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
      {!state.success && state.message && (
        <Callout
          className="mt-4"
          variant={"warning"}
          icon={false}
        >
          {state.message}
        </Callout>
      )}
    </>
  );
};
