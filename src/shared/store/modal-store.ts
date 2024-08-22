import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  advisorIdToDelete: string | null;
  modalType: string | null;
  modalProps: Record<string, any>;
  openModal: (type: string, props?: Record<string, any>) => void;
  closeModal: () => void;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  advisorIdToDelete: null,
  modalType: null,
  modalProps: {},
  openModal: (type, props = {}) => set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
  openDeleteModal: (id: string) => set({ advisorIdToDelete: id }),
  closeDeleteModal: () => set({ advisorIdToDelete: null }),
}));