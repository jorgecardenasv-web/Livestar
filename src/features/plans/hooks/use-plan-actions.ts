import { useModalStore } from "@/shared/store/modal-store";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const usePlanActions = () => {
  const {
    closeModal,
    isOpen,
    modalType,
    modalProps: plan,
    openModal,
  } = useModalStore();
  const openDeletePlanModal = (plan: any) => openModal("deletePlan", plan);
  const handleCancel = () => closeModal();

  return {
    isOpen,
    modalType,
    plan,
    openDeletePlanModal,
    handleCancel,
  };
};
