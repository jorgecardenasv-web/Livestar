import { useNotificationStore } from '@/features/notification/store/notification-store';
import { useModalStore } from '@/shared/store/modal-store';
import { useFormState } from 'react-dom';
import { addAdvisor } from '../actions/add-advisor';
import { useEffect } from 'react';

export const useAddAdvisor = () => {
  const { isOpen, openModal, closeModal } = useModalStore();
  const { showNotification } = useNotificationStore();
  const [state, formAction] = useFormState(addAdvisor, {
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
      showNotification("¡Asesor creado exitosamente!", "success");
    }

    if (Boolean(state?.errors?.general?.length)) {
      if (state?.errors?.general) {
        closeModal();
        showNotification(state.errors.general ?? "Error desconocido", "error");
      }
    }
  }, [state.errors, closeModal, showNotification]);

  const openAddAdvisorModal = () => openModal('addAdvisor');

  return {
    isOpen,
    openAddAdvisorModal,
    closeModal,
    formAction,
    formState: state
  };
};