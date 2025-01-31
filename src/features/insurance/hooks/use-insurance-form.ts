import { useEffect } from "react";
import { useFormState } from "react-dom";

import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { getNotificationMessage } from "@/shared/utils";
import { FormState } from "@/shared/types";

export const useInsuranceForm = (
  serverAction: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<FormState>
) => {
  const { closeModal, modalType, modalProps } = useModalStore();
  const { showNotification } = useNotificationStore();

  const bodedServerAction = serverAction.bind(null, modalProps.id);

  const [state, formAction] = useFormState(bodedServerAction, {
    message: "",
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      showNotification(state.message, "success");
    }
  }, [state?.success, state.message, closeModal, showNotification, modalType]);

  const handleDeleteInsurance = async (id: string): Promise<void> => {
    await serverAction.bind(null, id);
    closeModal();

    return showNotification(getNotificationMessage("deleteAdvisor"), "success");
  };

  return {
    // Estados
    state,

    // Acciones
    handleDeleteInsurance,

    // Accion de servidor
    formAction,
  };
};
