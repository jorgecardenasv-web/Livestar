import { useModalStore } from "@/shared/store/modal-store";
import { Insurance } from "../types/insurance";
import { insurances } from "../../../../prisma/seed/data/insurance.data";

export const useInsuranceActions = () => {
  const {
    openModal,
    closeModal,
    isOpen,
    modalProps: insurance,
    modalType,
  } = useModalStore();

  const openAddInsuranceModal = () => openModal("createInsurance");

  const handleCancel = () => closeModal();

  const openDeleteInsuranceModal = (insurance: Insurance) =>
    openModal("deleteInsurance", insurance);

  const openEditInsuranceModal = (insurance: Insurance) =>
    openModal("editInsurance", insurance);

  return {
    isOpen,
    insurance,
    modalType,

    openAddInsuranceModal,
    handleCancel,
    openDeleteInsuranceModal,
    openEditInsuranceModal,
  };
};
