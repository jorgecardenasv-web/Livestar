import { useModalStore } from "@/shared/store/modal-store";

export const usePlanActions = () => {
  const { closeModal, isOpen, modalType, openModal } =
    useModalStore();

    const openAddPlanNameModal = () => openModal("addPlanName")

    const handleCancel = () => closeModal()

    return {
      isOpen,
      modalType,
      openAddPlanNameModal,
      handleCancel
    }
};
