import React, { ReactNode } from "react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
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
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "6xl";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl h-fit",
  "4xl": "max-w-4xl h-fit",
  "6xl": "max-w-6xl h-fit",
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
        <DialogHeader className="px-4 py-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full">
          <div className="space-y-4 py-4 px-2 w-full">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
