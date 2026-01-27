"use client";

import corazon from "@/assets/home/heart-icon.png";
import Ahorro from "@/assets/home/Ahorro.png";
import vehiculos from "@/assets/home/vehiculos.png";
import { QuoteCard } from "../cards/quote-card";

export const Quotes = () => {
  return (
    <section className="max-w-7xl mx-auto pb-20 lg:pb-24 text-center flex justify-center items-center px-4 flex-col text-gray-600">
      <h2 className="text-4xl md:text-5xl font-bold text-gradiant">Cotizadores</h2>
      <h3 className="my-3 font-bold text-base md:text-lg">
        Soluciones personalizadas y eficientes
      </h3>
      <p className="my-3 text-base md:text-lg text-wrap max-w-[650px] text-center w-11/12 sm:w-3/4">
        Obtén el apoyo experto, la asistencia humana y la agilidad de respuesta
        que necesitas en los momentos críticos.
      </p>
      <div className="w-full mt-10 grid grid-cols-1 gap-8 sm:max-w-lg md:max-w-none md:grid-cols-3 md:gap-6 lg:gap-8">
        <QuoteCard
          description="El ahorro es una inversión crucial para proteger a tu familia, asegurando su estabilidad ante fallecimiento o invalidez."
          image={corazon}
          title={"Vida"}
          href="https://livestar.mx/seguros/vida/"
        />
        <QuoteCard
          description="Protege lo que más importa con nuestro seguro de vida. Brinda tranquilidad a ti y a tus seres queridos."
          image={Ahorro}
          title={"Ahorro"}
          href="https://livestar.mx/emma/ahorro.php"
        />
        <QuoteCard
          description="Contar con el seguro adecuado a tu estilo de movilidad protege una parte significativa de tu patrimonio, beneficiando a tu familia."
          image={vehiculos}
          title={"Vehículos"}
          href="https://livestar.mx/seguros/vehiculos/"
        />
      </div>
    </section>
  );
};
