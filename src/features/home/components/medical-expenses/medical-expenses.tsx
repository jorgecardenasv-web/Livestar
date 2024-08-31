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
      <h2 className="text-gradiant text-5xl font-bold text-center">
        Gastos Médicos
      </h2>

      <p className="text-lg text-center texto-slate md:w-[30%] sm:w-[80%]">
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



import { ClipboardList, Stethoscope, PiggyBank, Users } from 'lucide-react'

export function Component() {
  return (
    <div className="container mx-auto px-4 pt-12 text-gray-600">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-b from-[#008AED] to-[#004E87] text-transparent bg-clip-text">Gastos Médicos</h2>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-muted-foreground">
        Revisamos cada detalle de tu caso para garantizarte la máxima protección
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card text-card-foreground rounded-lg p-6 flex flex-col items-center text-center">
          <ClipboardList className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Experiencia Personalizada</h3>
          <p>Contamos con toda la experiencia para diseñar el plan acorde a las posibilidades y necesidades de cada cliente.</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-6 flex flex-col items-center text-center">
          <PiggyBank className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Planeación a Largo Plazo</h3>
          <p>Tomamos en cuenta los costos desde el inicio para asegurar tu capacidad de contratación durante toda la vida de tu seguro.</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-6 flex flex-col items-center text-center">
          <Stethoscope className="w-12 h-12 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Continuidad Asegurada</h3>
          <p>Hacemos una planeación financiera para que puedas mantener el pago de tu seguro de gastos médicos aun cuando ya no te encuentres en etapa laboral.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Atención Especializada</h3>
          <p>
            Cada caso es único, por eso en Livestar contamos con un equipo de médicos especialistas enfocados en revisarlo detalladamente. Tratándose específicamente de los siniestros, entablamos una comunicación directa entre médicos tratantes y la aseguradora con el fin de agilizar al máximo el nivel de atención, tanto en tiempos de respuesta como en nivel de la cobertura.
          </p>
        </div>
        <div className="bg-gradient-to-b from-[#008AED] to-[#004E87] text-primary-foreground rounded-lg p-8 flex flex-col justify-center text-white">
          <div className="flex items-center mb-4">
            <Users className="w-12 h-12 mr-4" />
            <h3 className="text-2xl font-semibold">Experiencia Única</h3>
          </div>
          <p>
            Somos el único despacho en el Occidente del país y uno de los tres a nivel nacional con staff médico in situ (en oficina y atención) enfocado en brindarte acompañamiento y hacer válidas las condiciones estipuladas en tu póliza.
          </p>
        </div>
      </div>
    </div>
  )
}