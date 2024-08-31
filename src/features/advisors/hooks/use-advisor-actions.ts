import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { deleteAdvisor } from "../actions/delete-advisor";
import { Advisor } from "../types/advisor";
import { getErrorMessage } from "@/shared/utils";

export const useAdvisorActions = (action?: any) => {
  const { isOpen, openModal, closeModal, modalType, modalProps } =
    useModalStore();
  const { showNotification } = useNotificationStore();

  const [state, formAction] = useFormState(action, {
    errors: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      general: "",
    },
  });

  useEffect(() => {
    if (state.errors === null) {
      closeModal();
      showNotification(getErrorMessage(modalType ?? ""), "success");
    }

    if (state?.errors?.general) {
      closeModal();
      showNotification(state.errors.general ?? "Error desconocido", "error");
    }
  }, [state.errors, closeModal, showNotification, modalType]);

  const handleCancel = () => closeModal();

  const openAddAdvisorModal = () => openModal("addAdvisor");

  // Delete Advisor
  const openDeleteAdvisorModal = (advisor: Advisor) =>
    openModal("deleteAdvisor", { advisor });
  const handleDeleteAdvisor = async (id: string): Promise<void> => {
    const isOperationConfirmed: boolean = await deleteAdvisor(id);
    closeModal();

    if (isOperationConfirmed)
      return showNotification(getErrorMessage("deleteAdvisor"), "success");
    showNotification("Error desconocido", "error");
  };

  // Edit Advisor
  const openEditAdvisorModal = (advisor: Advisor) =>
    openModal("editAdvisor", { advisor });

  return {
    // General Actions
    state,
    isOpen,
    modalType,
    modalProps,
    handleCancel,
    closeModal,
    formAction,

    // Add Advisor
    openAddAdvisorModal,

    // Edit Advisor
    openEditAdvisorModal,

    // Delete Advisor
    openDeleteAdvisorModal,
    handleDeleteAdvisor,
  };
};
