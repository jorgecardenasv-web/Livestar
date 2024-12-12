"use client";

import { saveProspectInCookies } from "@/features/insurance-quote/actions/save-prospect-in-cookies";
import { Button } from "@/shared/components/ui/button";
import { TextInput } from "@/shared/components/ui/text-input";
import Link from "next/link";
import { useFormState } from "react-dom";

export const CallToAction = () => {
  const [state, formAction] = useFormState(saveProspectInCookies, {
    name: "",
    postalCode: 0,
  });

  return (
    <>
      <div className="backdrop-blur-sm bg-white/10 p-6 rounded-2xl shadow-lg w-full xl:w-auto text-left">
        <h2 className="text-4xl font-bold mb-1 text-white">
          Cotiza tu seguro médico
        </h2>
        <p className="mb-4 text-base text-white">
          ¡Descubre el precio más conveniente al momento!
        </p>
        <form action={formAction} className="flex flex-col gap-y-6">
          <TextInput
            label="Mi nombre es"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Escribe tu nombre"
            error=""
            darkLabel
          />
          <TextInput
            label="Mi código postal es"
            error=""
            type="number"
            id="postalCode"
            name="postalCode"
            autoComplete="off"
            darkLabel
            placeholder="Escribe tu código postal"
          />
        </form>
      </div>
    </>
  );
};
