"use client";

import { Modal } from "@/shared/components/ui/modal";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { FormSelectorProspect } from "./form-selector-prospect";
import { xlsx } from "@/shared/utils/create-xlsx";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/shared/components/ui/data-range-picker";

export const ModalProspectActions = ({ advisors }: { advisors: Advisor[] }) => {
  const { isOpen, modalType } = useProspectActions();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateRange?.from && dateRange?.to) {
      await xlsx(
        "/api/reports/prospect",
        "Prospectos",
        ["id", "nombre", "email", "asesor", "email asesor", "createdAt"],
        "Prospectos",
        dateRange.from.toISOString(),
        dateRange.to.toISOString()
      );
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
            >
              Crear
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};
