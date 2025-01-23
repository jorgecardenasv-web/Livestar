import { useModalStore } from "@/shared/store/modal-store";
import { deletePlan } from "../actions/delete-plan";
import { useNotificationStore } from "@/features/notification/store/notification-store";

export const usePlanActions = () => {
  const { closeModal, isOpen, modalType, modalProps, openModal } =
    useModalStore();
  const { showNotification } = useNotificationStore();

  const openDeletePlanModal = (plan: any) => openModal("deletePlan", plan);
  const handleCancel = () => closeModal();

  const handleDeletePlan = async (id: string): Promise<void> => {
    const { success, message } = await deletePlan(id);
    closeModal();

    if (success) {
      showNotification(message, "success");
    } else if (message && !success) {
      showNotification(message, "error");
    }
  };

  return {
    isOpen,
    modalType,
    modalProps,
    openDeletePlanModal,
    handleCancel,
    handleDeletePlan,
  };
};
