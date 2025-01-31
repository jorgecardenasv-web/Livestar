import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { getNotificationMessage } from "@/shared/utils";
import { Prospect } from "../types/prospect";
import { changeStatusAndAdvisor } from "../actions/change-advisor";

export const useProspectActions = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    modalType,
    modalProps: prospect,
  } = useModalStore();
  const { showNotification } = useNotificationStore();

  const updateUserWithId = changeStatusAndAdvisor.bind(null, prospect?.id);

  const [state, formAction] = useFormState(updateUserWithId, {
    message: "",
    inputErrors: {},
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      closeModal();
      showNotification(getNotificationMessage(modalType ?? ""), "success");
    }

    if (!state.success && state.message) {
      console.error(state.message);
    }
  }, [state?.success, state.message, closeModal, showNotification, modalType]);

  const handleCancel = () => closeModal();

  // Edit prospect
  const openEditProspectModal = (prospect: Prospect) =>
    openModal("editProspect", prospect);

  const openXlsxModal = () => openModal("createXlsx");

  return {
    // General Actions
    state,
    isOpen,
    modalType,
    prospect,
    handleCancel,
    closeModal,
    formAction,

    // Edit prospect
    openEditProspectModal,

    // Create Xlsx
    openXlsxModal,
  };
};
