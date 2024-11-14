import { useModalStore } from "@/shared/store/modal-store";

export const useStorytelling = () => {
  const { openModal } = useModalStore();

  const openModalStorytelling = () => openModal("formQuote");

  return {
    openModalStorytelling,
  };
};
