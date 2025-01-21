"use client";

import { Modal } from "@/shared/components/ui/modal";
import { useAdvisorActions } from "../../hooks/use-advisor-actions";
import { CreateAdvisorForm } from "../forms/create-advisor-form";
import { DeleteAdvisorForm } from "../forms/delete-advisor-form";
import { UpdateAdvisorForm } from "../forms/update-advisor-form";

export const ModalAdvisorActions = (): JSX.Element => {
  const { isOpen, modalType } = useAdvisorActions();

  return (
    <>
      {/* ! Add advisor modal */}
      {isOpen && modalType === "createAdvisor" && (
        <Modal
          title="Crear Nuevo Asesor"
          description="Escribe la información requerida para crear un nuevo perfil de asesor."
          size="lg"
        >
          <CreateAdvisorForm />
        </Modal>
      )}

      {/* ! Delete advisor modal */}
      {isOpen && modalType === "deleteAdvisor" && (
        <Modal
          title="Eliminar Asesor"
          description="¿Estás seguro de que deseas eliminar este registro?"
          size="lg"
        >
          <DeleteAdvisorForm />
        </Modal>
      )}

      {/* ! Edit advisor modal */}
      {isOpen && modalType === "updateAdvisor" && (
        <Modal
          title="Editar Asesor"
          description="Modifique la información necesaria para actualizar el perfil del asesor."
          size="lg"
        >
          <UpdateAdvisorForm />
        </Modal>
      )}
    </>
  );
};
