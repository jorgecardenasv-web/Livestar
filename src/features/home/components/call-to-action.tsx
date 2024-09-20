"use client";

import {
  TextInput,
  Button,
} from "@tremor/react";
import { GetQuoteForm } from "@/features/insurance-quote/components/get-quote-form";
import { Modal } from "@/shared/components/modal";
import { useModalStore } from "@/shared/store/modal-store";

export const CallToAction = () => {
  const { openModal } = useModalStore();

  return (
    <>
      <div className="backdrop-blur-sm bg-white/10 p-6 rounded-2xl shadow-lg w-full xl:w-auto text-left">
        <h2 className="text-4xl font-bold mb-1">Cotiza tu futuro</h2>
        <p className="mb-4 text-base">
          ¡Descubre el precio más conveniente al momento!
        </p>
        <div className="flex flex-col gap-y-6">
          <div className="hover:cursor-pointer" onClick={() => openModal("getQuote")}>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="text-lg font-bold">
                Mi nombre es
              </label>
              <TextInput
                disabled
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                placeholder="Ingrese su nombre"
                className="-z-10"
              />
            </div>
          </div>
          <div className="hover:cursor-pointer" onClick={() => openModal("getQuote")}>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="cp" className="text-lg font-bold">
                Mi código postal es
              </label>
              <TextInput
                disabled
                type="number"
                id="cp"
                name="cp"
                autoComplete="off"
                placeholder="Ingrese su código postal"
                className="-z-10"
              />
            </div>
          </div>
          <Button
            onClick={() => openModal("getQuote")}
            className="bg-white lg:w-5/6 mx-auto text-[#008AED] px-6 py-3 rounded-lg font-bold text-lg w-full"
          >
            ¡Ver mi precio ahora!
          </Button>
        </div>
      </div>

      <Modal
        title=""
        description=""
        size="3xl"
      >
        <GetQuoteForm />
      </Modal>
    </>
  );
};