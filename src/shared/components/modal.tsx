import React, { ReactNode } from "react";
import { Dialog, DialogPanel } from "@tremor/react";
import { useModalStore } from "../store/modal-store";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "6xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "6xl": "max-w-6xl h-[600px]",
};

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  size = "md",
}) => {
  const { isOpen, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onClose={closeModal} static={true}>
      <DialogPanel className={`${sizeClasses[size]}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {title}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={28} />
          </button>
        </div>
        {description && (
          <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {description}
          </p>
        )}
        <div className="mt-5">{children}</div>
      </DialogPanel>
    </Dialog>
  );
};
