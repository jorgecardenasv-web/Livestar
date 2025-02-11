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
  "3xl": "max-w-3xl h-[500px]",
  "4xl": "max-w-4xl h-[600px]",
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
      <DialogContent className={`${sizeClasses[size]} max-h-[600px]`}>
        <DialogHeader className="px-4 py-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[500px]">
          <div className="space-y-4 py-4 px-2 w-full">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
