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
          <Modal 
            title="Eliminar Plan" 
            description="¿Estás seguro de que deseas eliminar este plan? Esta acción no se puede deshacer."
            size="lg"
          >
            <DeletePlanForm />
          </Modal>
        )
      }
    </>
  );
};
