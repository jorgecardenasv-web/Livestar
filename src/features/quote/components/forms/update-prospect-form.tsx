"use client";

import { useQuoteActions } from "../../hooks/use-quote-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { SelectInput } from "@/shared/components/ui/select-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { quoteStatus } from "../../data";

export const UpdateQuoteForm = ({ advisors }: { advisors: Advisor[] }) => {
  const { formAction, quote } = useQuoteActions();

  return (
    <form className="space-y-4" action={formAction}>
      <SelectInput
        label="Estado"
        name="status"
        defaultValue={quote?.status}
        options={quoteStatus}
      />

      <SelectInput
        label="Asesor asignado"
        name="userId"
        defaultValue={quote?.user?.id}
        options={advisors.map((advisor) => ({
          value: advisor.id,
          label: advisor.name,
        }))}
      />

      <div className="flex justify-end mt-4">
        <SubmitButton
          type="submit"
          label="Guardar"
          className="h-12 w-full text-md"
          labelPending="Guardando..."
        />
      </div>
    </form>
  );
};
