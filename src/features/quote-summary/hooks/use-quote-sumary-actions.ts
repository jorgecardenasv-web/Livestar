import { useModalStore } from "@/shared/store/modal-store";

export function useQuoteSumaryActions() {
  const { isOpen, modalProps, modalType, closeModal, openModal } =
    useModalStore();

  const openModalMoreInformation = (individualPrices: any) =>
    openModal("moreInformationQuote", individualPrices);

  const openModalMultipleDeductible = (
    title: string,
    children: string,
    deductibles: any
  ) => openModal("multipleDeducible", { title, children, deductibles });

  return {
    openModalMoreInformation,
    openModalMultipleDeductible,
    closeModal,
    isOpen,
    modalType,
    modalProps,
  };
}
