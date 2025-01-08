"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import InsurancePlanForm from "../form/insurance-plan-form";
import { usePlanActions } from "../../hooks/use-plan-actions";

export const ModalPlanActions: FC = () => {
  const { isOpen, modalType } = usePlanActions();

  return (
    <>
      {isOpen && modalType === "addPlan" && (
        <Modal title="Nuevo Plan" size="6xl">
          <InsurancePlanForm />
        </Modal>
      )}
    </>
  );
};
