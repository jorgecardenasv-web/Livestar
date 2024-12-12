"use client";

import { FC } from "react";
import { Modal } from "@/shared/components/ui/modal";

import { useModalStore } from "@/shared/store/modal-store";
import { GetQuoteForm } from "@/features/insurance-quote/components/get-quote-form";

export const ModalStorytellingActions: FC = () => {
  const { isOpen, modalType, modalProps } = useModalStore();

  return (
    <>
      {isOpen && modalType === "formQuote" && (
        <Modal
          title=""
          size="3xl"
        >
          <GetQuoteForm prospect={modalProps.prospect} />
        </Modal>
      )}
    </>
  );
};
