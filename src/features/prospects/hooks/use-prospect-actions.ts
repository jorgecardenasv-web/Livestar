import { useNotificationStore } from "@/features/notification/store/notification-store";
import { useModalStore } from "@/shared/store/modal-store";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@/shared/utils";
import { Prospect } from "../types/prospect";
import { changeStatusAndAdvisor } from "../actions/change-status-and-advisor";

export const useProspectActions = () => {
  const { isOpen, openModal, closeModal, modalType, modalProps } =
    useModalStore();
  const { showNotification } = useNotificationStore();

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>("");

  const updateUserWithId = changeStatusAndAdvisor.bind(
    null,
    modalProps.prospect?.id
  );

  const [state, formAction] = useFormState(updateUserWithId, {
    errors: {
      status: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (modalProps.prospect) {
      setSelectedStatus(modalProps.prospect.status);
      setSelectedAdvisor(modalProps.prospect.user.uuid);
    }
  }, [modalProps]);

  useEffect(() => {
    if (state?.errors === null) {
      closeModal();
      showNotification(getErrorMessage(modalType ?? ""), "success");
    }
  }, [state?.errors, closeModal, showNotification, modalType]);

  const handleCancel = () => closeModal();

  // Edit prospect
  const openEditProspectModal = (prospect: Prospect) =>
    openModal("editProspect", { prospect });

  const openXlsxModal = () =>
    openModal("createXlsx");

  return {
    // General Actions
    state,
    isOpen,
    modalType,
    modalProps,
    handleCancel,
    closeModal,
    formAction,

    // Edit Prospect
    setSelectedStatus,
    selectedStatus,
    setSelectedAdvisor,
    selectedAdvisor,

    // Edit prospect
    openEditProspectModal,

    // Create Xlsx
    openXlsxModal,
  };
};
