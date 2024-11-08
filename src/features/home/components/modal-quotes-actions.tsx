"use client";

import { FC } from "react";
import Image from "next/image";
import { Modal } from "@/shared/components/ui/modal";
import prueba from "@/assets/images/Video-Placeholder.jpg";

import { useModalStore } from "@/shared/store/modal-store";
import { GetQuoteForm } from "@/features/insurance-quote/components/get-quote-form";

export const ModalQuotesAction: FC = () => {
  const { isOpen, modalType, modalProps } = useModalStore();

  return (
    <>
      {isOpen && modalType === "Vida" && (
        <Modal title="Vida" description="Descripcion para Vida" size="6xl">
          <div className="flex justify-center w-full">
            <Image
              src={prueba}
              alt="prueba"
              sizes="(max-width: 500px) 50vw,
              (max-width: 250px) 50vw,
              33vw"
            />
          </div>
        </Modal>
      )}
      {isOpen && modalType === "Ahorro" && (
        <Modal title="Ahorro" description="Descripcion para ahorro" size="6xl">
          <div className="flex justify-center w-full h-full">
            <Image
              src={prueba}
              alt="prueba"
              sizes="(max-width: 600px) 50vw,
              (max-width: 250px) 50vw,
              33vw"
            />
          </div>
        </Modal>
      )}
      {isOpen && modalType === "Vehículos" && (
        <Modal
          title="Vehículos"
          description=" Descripcion para Vehículos"
          size="6xl"
        >
          <div className="flex justify-center w-full ">
            <Image
              src={prueba}
              alt="prueba"
              sizes="(max-width: 500px) 50vw,
              (max-width: 250px) 50vw,
              33vw"
            />
          </div>
        </Modal>
      )}
      {isOpen && modalType === "formQuote" && (
        <Modal
          title="Editar Asesor"
          description="Modifique la información necesaria para actualizar el perfil del asesor."
          size="3xl"
        >
          <GetQuoteForm prospect={modalProps.prospect} />
        </Modal>
      )}
    </>
  );
};
