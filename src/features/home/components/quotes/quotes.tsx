import React from "react";
import corazon from "../../../../assets/home/heart-icon.png";
import Ahorro from "../../../../assets/home/Ahorro.png";
import vehiculos from "../../../../assets/home/vehiculos.png";
import { CardQuotes } from "./card-quotes";
export const Quotes = () => {
  return (
    <section className="w-full bg-white flex justify-center items-center flex-col h-auto">
      <h2 className="text-5xl my-5 font-bold text-gradiant">Cotizadores</h2>
      <p className="my-3 text-[#757575] font-bold text-lg">
        Soluciones personalizadas y eficientes
      </p>
      <p className="my-3 text-[#757575] text-lg text-wrap max-w-[500px] text-center w-3/4">
        obtén el apoyo experto, la asistencia humana y la agiad de respuesta que
        necesitas en los momentos críticos.
      </p>
      <div className="w-full bg-white flex justify-center items-center gap-14 flex-wrap">
        <CardQuotes image={corazon} textCard={"Vida"} />
        <CardQuotes image={Ahorro} textCard={"Ahorro"} />
        <CardQuotes image={vehiculos} textCard={"vehículos"} />
      </div>
    </section>
  );
};
