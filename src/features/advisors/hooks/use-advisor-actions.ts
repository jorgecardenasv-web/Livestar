import { useModalStore } from "@/shared/store/modal-store";
import { Advisor } from "../types/advisor";

export const useAdvisorActions = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    modalType,
    modalProps: advisor,
  } = useModalStore();

  const handleCancel = () => closeModal();

  const openAddAdvisorModal = () => openModal("createAdvisor");

  const openDeleteAdvisorModal = (advisor: Advisor) =>
    openModal("deleteAdvisor", advisor);

  const openEditAdvisorModal = (advisor: Advisor) =>
    openModal("updateAdvisor", advisor);

  return {
    isOpen,
    modalType,
    advisor,
    handleCancel,
    closeModal,
    openAddAdvisorModal,
    openDeleteAdvisorModal,
    openEditAdvisorModal,
  };
};
