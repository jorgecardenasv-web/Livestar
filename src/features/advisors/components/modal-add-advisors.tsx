"use client";

import { UserRoundPlus } from "lucide-react";
import { Modal } from "@/shared/components/modal";
import { useAddAdvisor } from "../hooks/useAddAdvisor";
import { AddAdvisorForm } from "./add-advisor-form";

export const ModalAddAdvisors = (): JSX.Element => {
  const {
    isOpen,
    openAddAdvisorModal,
    closeModal,
  } = useAddAdvisor();

  return (
    <>
      <button
        className="flex items-center flex-row bg-primary p-3 gap-1 rounded-md text-white text-base"
        onClick={openAddAdvisorModal}
      >
        <UserRoundPlus size={20} />
        <span className="m-0 text-sm hidden lg:block">Crear asesor</span>
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={closeModal}
        title="Crear Nuevo Asesor"
        description="Ingrese la información requerida para crear un nuevo perfil de asesor."
        size="lg"
        showCloseButton={true}
        closeButtonText="Cancelar"
      >
        <AddAdvisorForm />
      </Modal>
    </>
  );
};