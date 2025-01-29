"use client";

import { Modal } from "@/shared/components/ui/modal";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { CreateInsuranceForm } from "../form/create-insurence-form";
import { DeleteInsuranceForm } from "../form/delete-insurance-form";
import { UpdateInsuranceForm } from "../form/update-insurence-form";

export const ModalInsuranceActions = () => {
  const { isOpen, modalType } = useInsuranceActions();

  return (
    <>
      {isOpen && modalType === "createInsurance" && (
        <Modal
          title="Crear Nueva Aseguradora"
          description="Escribe la información requerida para crear una nueva aseguradora."
          size="lg"
        >
          <CreateInsuranceForm />
        </Modal>
      )}

      {isOpen && modalType === "deleteInsurance" && (
        <Modal
          title="Eliminar Aseguradora"
          description="¿Estás seguro de que deseas eliminar esta aseguradora?"
          size="lg"
        >
          <DeleteInsuranceForm />
        </Modal>
      )}

      {isOpen && modalType === "editInsurance" && (
        <Modal
          title="Editar Aseguradora"
          description="Escrible la informacion requerida para actualizar la aseguradora."
          size="lg"
        >
          <UpdateInsuranceForm />
        </Modal>
      )}
    </>
  );
};
