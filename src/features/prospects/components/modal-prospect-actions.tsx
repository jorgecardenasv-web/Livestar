"use client";

import { Modal } from "@/shared/components/modal";
import { useProspectActions } from "../hooks/use-prospect-actions";
import { Advisor } from "@/features/advisors/types/advisor";
import { FormSelectorProspect } from "./form-selector-prospect";

export const ModalProspectActions = ({ advisors }: { advisors: Advisor[] }) => {
  const {
    isOpen,
    modalType,
  } = useProspectActions();

  return (
    <>
      {isOpen && modalType === "editProspect" && (
        <Modal title="Editar Prospecto" description="" size="lg">
          <FormSelectorProspect advisors={advisors} />
        </Modal>
      )}
    </>
  );
};
