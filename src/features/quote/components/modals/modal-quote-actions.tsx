"use client";

import { Modal } from "@/shared/components/ui/modal";
import { Advisor } from "@/features/advisors/types/advisor";
import { Button } from "@/shared/components/ui/button";
import { DateRangePicker } from "@/shared/components/ui/data-range-picker";
import { useQuoteActions } from "../../hooks/use-quote-actions";
import { UpdateQuoteForm } from "../forms/update-prospect-form";
import { useReport } from "../../hooks/use-report";
import { DeleteQuoteForm } from "../forms/delete-quote-form";

export const ModalQuoteActions = ({ advisors }: { advisors: Advisor[] }) => {
  const { isOpen, modalType } = useQuoteActions();
  const { handleDateChange, handleSubmit, isLoading } = useReport();

  return (
    <>
      {isOpen && modalType === "updateQuote" && (
        <Modal title="Editar Prospecto" description="" size="lg">
          <UpdateQuoteForm advisors={advisors} />
        </Modal>
      )}

      {isOpen && modalType === "createXlsx" && (
        <Modal title="Creación de Reporte" description="" size="lg">
          <form className="mx-auto max-w-md space-y-6" onSubmit={handleSubmit}>
            <DateRangePicker onDateRangeChange={handleDateChange} />
            <Button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded font-bold text-lg mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Generando..." : "Crear"}
            </Button>
          </form>
        </Modal>
      )}

      {isOpen && modalType === "deleteQuote" && (
        <Modal
          title="Eliminar Cotización"
          description="¿Estás seguro de que deseas eliminar esta cotización? Esta acción también podría eliminar el prospecto asociado si no tiene otras cotizaciones."
          size="lg"
        >
          <DeleteQuoteForm />
        </Modal>
      )}
    </>
  );
};
