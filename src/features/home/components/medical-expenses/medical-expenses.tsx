import React from "react";
import "./medical-expenses.css";
import { CardMedical } from "./card-medical";

const texts = {
  text1:
    "Contamos con toda la experiencia para diseñar el plan acorde a las posibilidades y necesidades de cada cliente.",
  text2:
    "Tomamos en cuenta los costos desde el inicio para asegurar tu capacidad de contratación durante toda la vida de tu seguro.",
  text3:
    "Hacemos una planeación financiera para que puedas mantener el pago de tu seguro de gastos médicos aun cuando ya no te encuentres en etapa laboral.",
};

export const MedicalExpenses = () => {
  return (
    <div className="flex flex-col items-center max-h-[1600px] gap-7 h-auto w-full my-5">
      <h2 className="text-gradiant text-6xl font-bold text-center">
        Gastos Médicos
      </h2>

      <p className=" text-lg text-center texto-slate md:w-[30%] sm:w-[80%]">
        Revisamos cada detalle de tu caso para garantizarte la máxima protección
      </p>
      <p className="text-lg texto-slate text-center md:w-[40%] sm:w-[80%]">
        Cada caso es único, por eso en Livestar contamos con un equipo de
        médicos especialistas enfocados en revisarlo detalladamente. Tratándose
        específicamente de los siniestros, entablamos una comunicación directa
        entre médicos tratantes y la aseguradora con el fin de agilizar al
        máximo el nivel de atención, tanto en tiempos de respuesta como en nivel
        de la cobertura. Así es como te garantizamos la máxima protección.
      </p>

      <div className="cards-container flex gap-10 justify-center items-center w-full flex-wrap mt-4">
        <CardMedical text={texts.text1} />
        <CardMedical text={texts.text2} />
        <CardMedical text={texts.text3} />
      </div>
      <p className="text-lg texto-slate text-center md:w-[40%] sm:w-[80%]">
        Somos el único despacho en el Occidente del país y uno de los tres a
        nivel nacional con staff médico in situ (en oficina y atención) enfocado
        en brindarte acompañamiento y hacer válidas las condiciones estipuladas
        en tu póliza.
      </p>
    </div>
  );
};
