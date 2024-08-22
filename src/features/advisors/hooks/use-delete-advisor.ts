import { useNotificationStore } from '@/features/notification/store/notification-store';
import { useModalStore } from '@/shared/store/modal-store';
import { deleteAdvisor } from '../actions/delete-advisor';

export const useDeleteAdvisor = () => {
    const { advisorIdToDelete, openDeleteModal, closeDeleteModal } = useModalStore();
    const { showNotification } = useNotificationStore();


    const handleDeleteAdvisor = async (id: string): Promise<void> => {
        const isOperationConfirmed: boolean = await deleteAdvisor(id);
        closeDeleteModal();

        if (isOperationConfirmed)
            return showNotification("¡Asesor borrado exitosamente!", "success");
        showNotification("Error desconocido", "error");
    };

    return {
        advisorIdToDelete,
        openDeleteModalAdvisor: openDeleteModal,
        closeDeleteModalAdvisor: closeDeleteModal,
        handleDeleteAdvisor
    };
};