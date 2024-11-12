"use client";

import { Modal } from "@/shared/components/modal";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { FormSelectorProspect } from "./form-selector-prospect";
import { Button, DateRangePicker } from "@tremor/react";
import { xlsx } from "@/shared/utils/create-xlsx";
import { Prospect } from "../types/prospect";
import { useState } from "react";
import { es } from "date-fns/locale";

export const ModalProspectActions = ({
  advisors,
  prospects,
}: {
  advisors: Advisor[];
  prospects?: Prospect[];
}) => {
  const prospect = prospects?.map((a) => ({
    id: a.id,
    nombre: a.name,
    email: a.email,
    createdAt: a.createdAt,
  }));
  const { isOpen, modalType } = useProspectActions();
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const handleDateChange = (range: any) => {
    setDateRange({
      startDate: range.from,
      endDate: range.to,
    });
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
          <form
            className="mx-auto max-w-md space-y-6"
            action={() =>
              xlsx(
                prospect,
                "Prospectos",
                ["id", "nombre", "email"],
                "Prospectos",
                dateRange.startDate,
                dateRange.endDate
              )
            }
          >
            <DateRangePicker
              onValueChange={handleDateChange}
              className="mx-auto max-w-md"
              locale={es}
            />{" "}
            <Button className="w-full bg-primary text-white px-6 py-3 rounded font-bold text-lg mt-10">
              Crear
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};
