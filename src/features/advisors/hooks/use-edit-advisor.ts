import { useNotificationStore } from '@/features/notification/store/notification-store';
import { useModalStore } from '@/shared/store/modal-store';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { editAdvisor } from '../actions/edit-advisor';

export const useEditAdvisor = () => {
    const { advisorIdToEdit, openEditModal, closeEditModal } = useModalStore();
    const { showNotification } = useNotificationStore((state) => state);
    const [state, formAction] = useFormState(editAdvisor, {
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
            closeEditModal();
            showNotification("¡Asesor editado exitosamente!", "success");
        }

        if (Boolean(state?.errors?.general?.length)) {
            if (state?.errors?.general) {
                closeEditModal();
                showNotification(state.errors.general ?? "Error desconocido", "error");
            }
        }

    }, [state.errors, closeEditModal, showNotification]);

    return {
        formAction,
        formState: state,
        advisorIdToEdit,
        openEditModalAdvisor: openEditModal,
        closeEditModalAdvisor: closeEditModal
    };
};