import React, { ReactNode } from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeButtonText?: string;
  customFooter?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  onClose,
  size = "md",
  showCloseButton = true,
  closeButtonText = "Cerrar",
  customFooter,
}) => {
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} static={true}>
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
