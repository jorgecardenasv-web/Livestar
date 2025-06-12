import React, { ReactNode, useEffect, useState } from "react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { useModalStore } from "../../store/modal-store";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "6xl";
  fullScreenOnMobile?: boolean;
  maxHeight?: string;
  hideCloseButton?: boolean;
  noPadding?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
};

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  size = "md",
  fullScreenOnMobile = false,
  maxHeight,
  hideCloseButton = false,
  noPadding = false,
}) => {
  const { isOpen, closeModal } = useModalStore();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Comprobar al inicio y cada vez que cambia el tamaño de la ventana
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const contentClasses = cn(
    sizeClasses[size],
    isMobile && fullScreenOnMobile && "!max-w-full !w-full !h-[100dvh] !p-0 !m-0 !rounded-none",
    "overflow-hidden"
  );

  const scrollHeight = maxHeight || (isMobile && fullScreenOnMobile ? "calc(100dvh - 100px)" : "60vh");

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={contentClasses}>
        <DialogHeader className={cn(
          "px-4 py-4",
          isMobile && "py-3"
        )}>
          <DialogTitle className={cn(
            "text-lg md:text-xl",
            isMobile && "text-center"
          )}>
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className={cn(
              isMobile ? "text-sm" : "text-base",
              "mt-1",
              isMobile && "text-center"
            )}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <ScrollArea
          className={cn(
            "h-full w-full",
            maxHeight ? `max-h-[${maxHeight}]` : isMobile ? "max-h-[72vh]" : "max-h-[60vh]",
            fullScreenOnMobile && isMobile && "max-h-[calc(100dvh-120px)]"
          )}
          style={{ maxHeight: scrollHeight }}
        >
          <div className={cn(
            "space-y-4 w-full",
            noPadding ? "p-0" : "py-4 px-2 md:px-4"
          )}>
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
