"use client";

import { Modal } from "@/shared/components/ui/modal";
import { Advisor } from "@/features/advisors/types/advisor";
import { Button } from "@/shared/components/ui/button";
import { DateRangePicker } from "@/shared/components/ui/data-range-picker";
import { useProspectActions } from "../../hooks/use-prospect-actions";
import { ProspectForm } from "../forms/prospect-form";
import { useReport } from "../../hooks/use-report";

export const ModalProspectActions = ({ advisors }: { advisors: Advisor[] }) => {
  const { isOpen, modalType } = useProspectActions();
  const { handleDateChange, handleSubmit, isLoading } = useReport();

  return (
    <>
      {isOpen && modalType === "editProspect" && (
        <Modal title="Editar Prospecto" description="" size="lg">
          <ProspectForm advisors={advisors} />
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
