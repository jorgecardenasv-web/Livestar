"use client";

import { Modal } from "@/shared/components/modal";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { FormSelectorProspect } from "./form-selector-prospect";
import { DateRangePicker } from "@tremor/react";
import { xlsx } from "@/shared/utils/create-xlsx";
import { Prospect } from "../types/prospect";
import { useState } from "react";

export const ModalProspectActions = ({ advisors, prospects }: {
  advisors: Advisor[],
  prospects?: Prospect[]
}) => {
  const prospect = prospects?.map((a) => (
    {id: a.id, nombre: a.name, email: a.email, createdAt: a.createdAt}))
  const { isOpen, modalType } = useProspectActions();

  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

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
        <Modal title="xlsx" description="" size="lg">
          <form action={()=> xlsx(
            prospect,
            "test2",
            ["id", "nombre", "email",],
            "text-test",
            dateRange.startDate,
            dateRange.endDate
            )}>
          <div className="mx-auto max-w-md space-y-3">
            <p className="pt-6 text-center font-mono text-sm text-slate-500">
              {" "}
              Date Range Picker{" "}
            </p>{" "}
            <DateRangePicker onValueChange={handleDateChange} className="mx-auto max-w-md"/>{" "}
            {/* <input type="hidden" name="startDate" value={dateRange.startDate} /> */}
            {/* <input type="hidden" name="endDate" value={dateRange.endDate} /> */}
          <button>submit</button>
          </div>
          </form>
        </Modal>
      )}
    </>
  );
};

