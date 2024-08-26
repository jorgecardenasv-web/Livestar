import React, { ReactNode } from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";
import { useModalStore } from "../store/modal-store";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
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
      <DialogPanel className={`${sizeClasses[size]}`} color="red">
        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {title}
        </h3>
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
