"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";
import { CreatePlanTypeForm } from "../forms/plan-type/create-plan-type-form";
import { UpdatePlanTypeForm } from "../forms/plan-type/update-plan-type-form";
import { DeletePlanTypeForm } from "../forms/plan-type/delete-plan-type-form";

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
      {isOpen && modalType === "deletePlanType" && (
        <Modal title="Eliminar tipo de plan" size="2xl">
          <DeletePlanTypeForm />
        </Modal>
      )}
    </>
  );
};
