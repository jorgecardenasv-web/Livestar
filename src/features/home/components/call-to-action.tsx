"use client";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  Dialog,
  DialogPanel,
  Title,
  Text,
} from "@tremor/react";
import { FormCallToAction } from "./form-call-to-action";

export const CallToAction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="backdrop-blur-sm bg-white/10 p-6 rounded-2xl shadow-lg w-full xl:w-auto text-left">
        <h2 className="text-4xl font-bold mb-1">Cotiza tu futuro</h2>
        <p className="mb-4 text-base">
          ¡Descubre el precio más conveniente al momento!
        </p>
        <form className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-lg font-bold">
              Mi nombre es
            </label>
            <TextInput
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Ingrese su nombre"
              onClick={handleInputClick}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="cp" className="text-lg font-bold">
              Mi código postal es
            </label>
            <TextInput
              type="number"
              id="cp"
              name="cp"
              autoComplete="off"
              placeholder="Ingrese su código postal"
              onClick={handleInputClick}
            />
          </div>
          <Button
            onClick={handleInputClick}
            className="bg-white lg:w-5/6 mx-auto text-[#008AED] px-6 py-3 rounded-lg font-bold text-lg w-full"
          >
            ¡Ver mi precio ahora!
          </Button>
        </form>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true}>
        <DialogPanel className="max-w-3xl w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2  className="text-5xl font-bold text-[#008AED] mx-auto">
              Cotiza tu futuro
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <FormCallToAction />
        </DialogPanel>
      </Dialog>
    </>
  );
};
