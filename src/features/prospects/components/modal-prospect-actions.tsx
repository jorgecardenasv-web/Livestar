"use client";

import { Modal } from "@/shared/components/ui/modal";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { FormSelectorProspect } from "./form-selector-prospect";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/shared/components/ui/data-range-picker";
import { generateReport } from "../actions/generate-report";

export const ModalProspectActions = ({ advisors }: { advisors: Advisor[] }) => {
  const { isOpen, modalType, closeModal } = useProspectActions();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateRange?.from && dateRange?.to) {
      setIsLoading(true);
      try {
        const base64Excel = await generateReport(
          dateRange.from.toISOString(),
          dateRange.to.toISOString()
        );

        const blob = new Blob([Buffer.from(base64Excel, "base64")], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Reporte_Prospectos.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        closeModal();
      } catch (error) {
        console.error("Error al generar el reporte:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Por favor, selecciona un rango de fechas válido");
    }
  };

  return (
    <>
      {isOpen && modalType === "editProspect" && (
        <Modal title="Editar Prospecto" description="" size="lg">
          <FormSelectorProspect advisors={advisors} />
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
    </>
  );
};
