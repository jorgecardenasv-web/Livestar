import { useModalStore } from "@/shared/store/modal-store";
import { Insurance } from "../types/insurance";
import { insurances } from "@/lib/prisma/data/insurance.data";

export const useInsuranceActions = () => {
  const { openModal, closeModal, isOpen, modalProps, modalType } =
    useModalStore();

  // Función para abrir el modal de agregar aseguradora
  const openAddInsuranceModal = () => openModal("createInsurance");

  // Función para cancelar la acción de modal
  const handleCancel = () => closeModal();

  // Función para abrir el modal de eliminar aseguradora
  const openDeleteInsuranceModal = (insurance: Insurance) =>
    openModal("deleteInsurance", insurance);

  // Función para abrir el modal de acrualizar aseguradora
  const openEditInsuranceModal = (insurance: Insurance) =>
    openModal("editInsurance", insurance);

  return {
    // Estados
    isOpen,
    modalProps,
    modalType,

    // Acciones
    openAddInsuranceModal,
    handleCancel,
    openDeleteInsuranceModal,
    openEditInsuranceModal,
  };
};
