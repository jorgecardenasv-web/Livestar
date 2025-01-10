import { useEffect } from "react";
import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { getErrorMessage } from "@/shared/utils";
import { useFormState } from "react-dom";
import { Insurance } from "../types/insurance";
import { deleteInsurance } from "../actions/delete-insurance";

export const useInsuranceActions = () => {
  const { openModal, closeModal, isOpen, modalProps, modalType } =
    useModalStore();

  // Función para abrir el modal de agregar aseguradora
  const openAddInsuranceModal = () => openModal("addInsurance");

  // Función para cancelar la acción de modal
  const handleCancel = () => closeModal();

  // Función para abrir el modal de eliminar aseguradora
  const openDeleteInsuranceModal = (insurance: Insurance) =>
    openModal("deleteInsurance", {
      insurance,
    });

  return {
    // Estados
    isOpen,
    modalProps,
    modalType,

    // Acciones
    openAddInsuranceModal,
    handleCancel,
    openDeleteInsuranceModal,
  };
};
