import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { FormState } from "@/shared/types";
import { getNotificationMessage } from "@/shared/utils";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export function usePlanTypeForm<P>(
  serverAction: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<FormState>
) {
  const { closeModal, isOpen, modalType, modalProps, openModal } =
    useModalStore();

  const { showNotification } = useNotificationStore();

  const boundServerAction = serverAction.bind(null, modalProps.id);

  const [state, formAction] = useFormState(boundServerAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state?.success) {
      closeModal();
      showNotification(state.message, "success");
    } else if (state?.message && !state?.success) {
      showNotification(state.message, "error");
    }
  }, [state, closeModal, showNotification, modalType]);

  return {
    state,
    formAction,
  };
}
