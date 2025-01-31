import { useModalStore } from "@/shared/store/modal-store";
import { PlanType } from "@prisma/client";

export const usePlanTypeActions = () => {
  const {
    closeModal,
    isOpen,
    modalType,
    modalProps: planType,
    openModal,
  } = useModalStore();

  const openAddPlanTypeModal = () => openModal("addPlanType");
  const openEditPlanTypeModal = (planType: PlanType) =>
    openModal("editPlanType", planType);

  const openDeletePlanModal = (planType: PlanType) =>
    openModal("deletePlanType", planType);

  const handleCancel = () => closeModal();

  return {
    isOpen,
    modalType,
    planType,
    openAddPlanTypeModal,
    openEditPlanTypeModal,
    openDeletePlanModal,
    handleCancel,
  };
};
