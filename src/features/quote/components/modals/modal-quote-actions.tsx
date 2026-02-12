"use client";

import { Modal } from "@/shared/components/ui/modal";
import { Advisor } from "@/features/advisors/types/advisor";
import { Button } from "@/shared/components/ui/button";
import { DateRangePicker } from "@/shared/components/ui/data-range-picker";
import { useQuoteActions } from "../../hooks/use-quote-actions";
import { UpdateQuoteForm } from "../forms/update-prospect-form";
import { useReport } from "../../hooks/use-report";
import { DeleteQuoteForm } from "../forms/delete-quote-form";
import { FileSpreadsheet, Calendar, Download } from "lucide-react";
import { User } from "@generated/prisma/client";

export const ModalQuoteActions = ({ advisors, currentUser }: { advisors: Advisor[], currentUser: User | null }) => {
  const { isOpen, modalType } = useQuoteActions();
  const { handleDateChange, handleSubmit, isLoading } = useReport();

  return (
    <>
      {isOpen && modalType === "updateQuote" && (
        <Modal title="Editar Prospecto" description="" size="lg">
          <UpdateQuoteForm advisors={advisors} currentUser={currentUser} />
        </Modal>
      )}

      {isOpen && modalType === "createXlsx" && (
        <Modal
          title="Exportar Reporte"
          description=""
          size="md"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Icono y descripción */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="rounded-full bg-primary/10 p-3 shrink-0">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Reporte de Cotizaciones</h4>
                <p className="text-sm text-muted-foreground">
                  Genera un archivo Excel con todas las cotizaciones del período seleccionado, incluyendo detalles del cliente, asesor y estado.
                </p>
              </div>
            </div>

            {/* Selector de fechas */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Selecciona el período
              </label>
              <DateRangePicker onDateRangeChange={handleDateChange} />
            </div>

            {/* Botón de acción */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generando reporte...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Generar y descargar Excel</span>
                </div>
              )}
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
