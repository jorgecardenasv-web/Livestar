import { useModalStore } from "@/shared/store/modal-store";
import { PlanType } from "@prisma/client";

export const usePlanTypeActions = () => {
  const { closeModal, isOpen, modalType, modalProps, openModal } =
    useModalStore();

  const openAddPlanTypeModal = () => openModal("addPlanType");
  const openEditPlanTypeModal = (planType: PlanType) =>
    openModal("editPlanType", planType);

  const openDeletePlanModal = (plan: any) => openModal("deletePlan", plan);
  const handleCancel = () => closeModal();

  return {
    isOpen,
    modalType,
    modalProps,
    openAddPlanTypeModal,
    openEditPlanTypeModal,
    openDeletePlanModal,
    handleCancel,
  };
};
