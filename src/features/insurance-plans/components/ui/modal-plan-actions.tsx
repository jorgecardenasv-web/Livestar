"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";
import { usePlanActions } from "../../hooks/use-plan-actions";
import { TextInput } from "@/shared/components/ui/text-input";
import { SubmitButton } from "@/shared/components/ui/submit-button";

export const ModalPlanActions: FC = () => {
  const { isOpen, modalType } = usePlanActions();

  return (
    <>
      {isOpen && modalType === "addPlanName" && (
        <Modal title="Nuevo nombre de plan">
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
    </>
  );
};
