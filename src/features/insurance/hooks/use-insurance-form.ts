import { useEffect } from "react";
import { useFormState } from "react-dom";

import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { getErrorMessage } from "@/shared/utils";

export const useInsuranceForm = (action: any) => {
  const { closeModal, modalType } = useModalStore();
  const { showNotification } = useNotificationStore();

  const [state, formAction] = useFormState(action, {
    errors: {
      name: "",
      logo: "",
    },
  });

  useEffect(() => {
    if (!state.errors) {
      closeModal();
      showNotification(getErrorMessage(modalType ?? ""), "success");
    }
  }, [state?.errors, closeModal, showNotification, modalType]);

  const handleDeleteInsurance = async (id: string): Promise<void> => {
    await action(id);
    closeModal();

    return showNotification(getErrorMessage("deleteAdvisor"), "success");
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
