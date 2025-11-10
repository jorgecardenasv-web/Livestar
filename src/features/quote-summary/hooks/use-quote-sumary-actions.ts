import { useModalStore } from "@/shared/store/modal-store";

export function useQuoteSumaryActions() {
  const {
    isOpen,
    modalProps,
    modalType,
    closeModal,
    openModal: openModalStore,
  } = useModalStore();

  const openModalMoreInformation = (individualPrices: any) =>
    openModalStore("moreInformationQuote", individualPrices);

  const openModalMultipleDeductible = (
    title: string,
    children: string,
    deductibles: any
  ) => openModalStore("multipleDeducible", { title, children, deductibles });

  const openModal = (type: string, props: any) => openModalStore(type, props);

  return {
    openModalMoreInformation,
    openModalMultipleDeductible,
    openModal,
    closeModal,
    isOpen,
    modalType,
    modalProps,
  };
}
