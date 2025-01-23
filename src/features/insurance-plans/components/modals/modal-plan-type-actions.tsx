"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";
import { UpdatePlanTypeForm } from "../forms/update-plan-type-form";
import { CreatePlanTypeForm } from "../forms/create-plan-type-form";
import { DeletePlanForm } from "../forms/delete-plan-form";

export const ModalPlanTypeActions: FC = () => {
  const { isOpen, modalType } = usePlanTypeActions();

  return (
    <>
      {isOpen && modalType === "addPlanType" && (
        <Modal title="Nuevo tipo de plan" size="2xl">
          <CreatePlanTypeForm />
        </Modal>
      )}
      {isOpen && modalType === "editPlanType" && (
        <Modal title="Editar tipo de plan" size="2xl" >
          <UpdatePlanTypeForm />
        </Modal>
      )}
    </>
  );
};
