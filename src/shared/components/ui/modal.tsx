import React, { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModalStore } from "../../store/modal-store";

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
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={`${sizeClasses[size]}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
