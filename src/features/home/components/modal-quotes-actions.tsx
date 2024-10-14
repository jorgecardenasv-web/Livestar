"use client";
import { Modal } from "@/shared/components/modal";
import Image from "next/image";
import prueba from "@/assets/images/Video-Placeholder.jpg";

import { useModalStore } from "@/shared/store/modal-store";
import { GetQuoteForm } from "@/features/insurance-quote/components/get-quote-form";

export const ModalQuotesAction = (): JSX.Element => {
  const { isOpen, modalType } = useModalStore();

  return (
    <>
      {isOpen && modalType === "Vida" && (
        <Modal title="Vida" description="Descripcion para Vida" size="xl6">
          <div className="flex justify-center items-center w-full ">
            {" "}
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
        <Modal title="Ahorro" description="Descripcion para ahorro" size="xl6">
          <div className="flex justify-center items-center w-full ">
            {" "}
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
      {isOpen && modalType === "Vehículos" && (
        <Modal
          title="Vehículos"
          description=" Descripcion para Vehículos"
          size="xl6"
        >
          <div className="flex justify-center items-center w-full ">
            {" "}
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
      {isOpen && modalType === "getQuote" && (
        <Modal
          title="Editar Asesor"
          description="Modifique la información necesaria para actualizar el perfil del asesor."
          size="3xl"
        >
          <GetQuoteForm />
        </Modal>
      )}
    </>
  );
};
