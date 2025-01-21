import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { deleteAdvisor } from "../actions/delete-advisor";
import { Advisor } from "../types/advisor";
import { getNotificationMessage } from "@/shared/utils";
import { FormState } from "@/shared/types";

export const useAdvisorForm = (
  serverAction: (prevState: any, formData: FormData) => Promise<FormState>
) => {
  const { closeModal, modalType } = useModalStore();
  const { showNotification } = useNotificationStore();

  const [state, formAction] = useFormState(serverAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      showNotification(state.message, "success");
    }

    if (!state?.success && state?.message) {
      closeModal();
      showNotification(state.message, "error");
    }
  }, [state.success, state.message, closeModal, showNotification, modalType]);

  const handleDeleteAdvisor = async (id: string): Promise<void> => {
    const { success, message } = await deleteAdvisor(id);
    closeModal();

    if (success) {
      showNotification(message, "success");
    } else if (message && !success) {
      showNotification(message, "error");
    }
  };

  return {
    state,
    formAction,
    handleDeleteAdvisor,
  };
};
