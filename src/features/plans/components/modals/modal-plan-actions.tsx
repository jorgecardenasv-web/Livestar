"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import { DeletePlanForm } from "../forms/plan/delete-plan-form";
import { usePlanActions } from "../../hooks/use-plan-actions";

export const ModalPlanActions: FC = () => {
  const { isOpen, modalType } = usePlanActions();

  return (
    <>
      {
        isOpen && modalType === "deletePlan" && (
          <Modal title="Eliminar tipo de plan" size="2xl">
            <DeletePlanForm />
          </Modal>
        )
      }
    </>
  );
};
