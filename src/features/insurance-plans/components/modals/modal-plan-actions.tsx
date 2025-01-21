"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import { usePlanTypeActions } from "../../hooks/use-plan-type-actions";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";
import { PlanTypeForm } from "../forms/plan-type-form";

export const ModalPlanTypeActions: FC = () => {
  const { isOpen, modalType } = usePlanTypeActions();

  return (
    <>
      {isOpen && modalType === "addPlanType" && (
        <Modal title="Nuevo tipo de plan" size="2xl">
          <form action="" className="mx-auto space-y-6">
            <TextInput name="planName" label="Nombre" />
            <SubmitButton
              label="Crear nombre"
              labelPending="Creando nombre..."
              className="w-full"
            />
          </form>
        </Modal>
      )}
      {isOpen && modalType === "editPlanType" && (
        <Modal title="Editar tipo de plan" size="2xl" >
          <PlanTypeForm />
        </Modal>
      )}
    </>
  );
};
