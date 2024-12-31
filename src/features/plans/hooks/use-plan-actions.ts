import { useModalStore } from "@/shared/store/modal-store"

export const usePlanActions = () => {
  const { closeModal, modalProps, modalType, openModal, isOpen } = useModalStore()

  const openAddPlanModal = () => openModal("addPlan")
  const handleCancel = () => closeModal()

  return {
    // Estados
    modalProps,
    modalType,
    isOpen,

    // Acciones
    openAddPlanModal,
    handleCancel
  }
}