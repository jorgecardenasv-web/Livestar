"use client";

import corazon from "@/assets/home/heart-icon.png";
import Ahorro from "@/assets/home/Ahorro.png";
import vehiculos from "@/assets/home/vehiculos.png";
import { QuoteCard } from "../cards/quote-card";
import { useModalStore } from "@/shared/store/modal-store";
import { ModalQuotesAction } from "../modals/modal-quotes-actions";

export const Quotes = () => {
  const { openModal } = useModalStore();
  return (
    <section className="max-w-7xl mx-auto my-6 text-center flex justify-center items-center px-4 flex-col h-auto py-10 rounded-md text-[#757575]">
      <h2 className="text-5xl font-bold text-gradiant">Cotizadores</h2>
      <h3 className="my-3 font-bold text-lg">
        Soluciones personalizadas y eficientes
      </h3>
      <p className="my-3 text-lg text-wrap max-w-[650px] text-center w-3/4">
        Obtén el apoyo experto, la asistencia humana y la agilidad de respuesta
        que necesitas en los momentos críticos.
      </p>
      <div className="w-full bg-white flex flex-col md:flex-row gap-y-10 justify-around items-center gap-x-5 mt-10">
        <QuoteCard
          description="El ahorro es una inversión crucial para proteger a tu familia, asegurando su estabilidad ante fallecimiento o invalidez."
          image={corazon}
          title={"Vida"}
          openModal={openModal}
        />
        <QuoteCard
          description="Protege lo que más importa con nuestro seguro de vida. Brinda tranquilidad a ti y a tus seres queridos."
          image={Ahorro}
          title={"Ahorro"}
          openModal={openModal}
        />
        <QuoteCard
          description="Contar con el seguro adecuado a tu estilo de movilidad protege una parte significativa de tu patrimonio, beneficiando a tu familia."
          image={vehiculos}
          title={"Vehículos"}
          openModal={openModal}
        />
        <ModalQuotesAction />
      </div>
    </section>
  );
};
