"use client";

import { Modal } from "@/shared/components/modal";
import { useAdvisorActions } from "../hooks/use-advisor-actions";
import { AddAdvisorForm } from "./forms/add-advisor-form";
import { DeleteAdvisorForm } from "./forms/delete-advisor-form";
import { EditAdvisorForm } from "./forms/edit-advisor-form";

export const ModalAdvisorActions = (): JSX.Element => {
  const { isOpen, modalType } = useAdvisorActions();

  return (
    <>
      {/* ! Add advisor modal */}
      {isOpen && modalType === "addAdvisor" && (
        <Modal
          title="Crear Nuevo Asesor"
          description="Escribe la información requerida para crear un nuevo perfil de asesor."
          size="lg"
        >
          <AddAdvisorForm />
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
      {isOpen && modalType === "editAdvisor" && (
        <Modal
          title="Editar Asesor"
          description="Modifique la información necesaria para actualizar el perfil del asesor."
          size="lg"
        >
          <EditAdvisorForm />
        </Modal>
      )}
    </>
  );
};
