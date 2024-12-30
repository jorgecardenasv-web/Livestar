"use client";

import { Modal } from "@/shared/components/ui/modal";
import { useInsuranceActions } from "../../hooks/use-insurance-actions";
import { AddInsuranceForm } from "../form/add-insurence-form";
import { DeleteInsuranceForm } from "../form/delete-insurance-form";
import { EditInsuranceForm } from "../form/edit-insurence-form";

export const ModalInsuranceActions = () => {
  const { isOpen, modalType } = useInsuranceActions();

  return (
    <>
      {isOpen && modalType === "addInsurance" && (
        <Modal
          title="Crear Nueva Aseguradora"
          description="Escribe la información requerida para crear una nueva aseguradora."
          size="lg"
        >
          <AddInsuranceForm />
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
    </>
  );
};
