import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { changeStatusAndAdvisor } from "../actions/change-advisor-and-status";
import { Quote } from "@prisma/client";

export const useQuoteActions = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    modalType,
    modalProps: quote,
  } = useModalStore();
  const { showNotification } = useNotificationStore();

  const updateUserWithId = changeStatusAndAdvisor.bind(null, quote?.id);

  const [state, formAction] = useFormState(updateUserWithId, {
    message: "",
    inputErrors: {},
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      showNotification(state.message, "success");
    }

    if (!state.success && state.message) {
      console.error(state.message);
    }
  }, [state?.success, state.message, closeModal, showNotification, modalType]);

  const handleCancel = () => closeModal();

  const openEditQuoteModal = (quote: Omit<Quote, "medicalHistories">) =>
    openModal("updateQuote", quote);

  const openXlsxModal = () => openModal("createXlsx");

  return {
    state,
    isOpen,
    modalType,
    quote,
    handleCancel,
    closeModal,
    formAction,
    openEditQuoteModal,
    openXlsxModal,
  };
};
