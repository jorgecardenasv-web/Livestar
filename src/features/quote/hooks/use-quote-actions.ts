import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { changeStatusAndAdvisor } from "../actions/change-advisor-and-status";
import { deleteQuote } from "../actions/delete-quote";
import { Quote } from "@generated/prisma/client";
import { useRouter } from "next/navigation";

export const useQuoteActions = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    modalType,
    modalProps: quote,
  } = useModalStore();
  const { showNotification } = useNotificationStore();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const updateUserWithId = changeStatusAndAdvisor.bind(null, quote?.id);

  const [state, formAction] = useActionState(updateUserWithId, {
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
  
  const openDeleteQuoteModal = (quote: Omit<Quote, "medicalHistories">) =>
    openModal("deleteQuote", quote);
  
  const handleDeleteQuote = async (quoteId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta cotización? Esta acción también podría eliminar el prospecto asociado si no tiene otras cotizaciones.")) {
      setIsDeleting(true);
      try {
        const result = await deleteQuote(quoteId);
        if (result.success) {
          showNotification(result.message, "success");
          router.refresh();
        } else {
          showNotification(result.message, "error");
        }
      } catch (error) {
        showNotification("Error al eliminar la cotización", "error");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

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
    handleDeleteQuote,
    openDeleteQuoteModal,
    isDeleting,
  };
};
