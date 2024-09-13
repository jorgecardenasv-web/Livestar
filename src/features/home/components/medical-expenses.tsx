import Image from "next/image";
import { Users } from "lucide-react";

import Stethoscope from "@/assets/home/Stethoscope.svg";
import Experience from "@/assets/home/experience.svg";
import Calculator from "@/assets/home/calculator.svg";
import Wallet from "@/assets/home/Wallet.svg";
import { MedicalExpenseCard } from "./medical-card";
import { AnimatedCircles } from "./animated-cicle";

export const MedicalExpenses = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30 z-0"></div>

      <div className="max-w-6xl mx-auto text-gray-600 flex flex-col gap-y-6 p-5 relative z-10">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-b from-[#008AED] to-[#004E87] text-transparent bg-clip-text">
          Gastos Médicos
        </h2>
        <h3 className="text-center text-lg mb-6 font-bold text-[#757575] max-w-3xl mx-auto text-balance">
          Revisamos cada detalle de tu caso para garantizarte la máxima
          protección
        </h3>

        {/* Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MedicalExpenseCard
            title="Experiencia Personalizada"
            description="Diseñamos tu plan de seguro a medida, adaptando cada póliza a tus necesidades únicas."
            image={Experience}
          />
          <MedicalExpenseCard
            title="Planeación a Largo Plazo"
            description="Anticipamos tu futuro financiero para asegurar una cobertura sostenible y duradera."
            image={Wallet}
          />
          <MedicalExpenseCard
            title="Continuidad Asegurada"
            description="Garantizamos tu protección más allá de la etapa laboral, asegurando tu bienestar a largo plazo."
            image={Calculator}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-8 shadow-lg border">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full mr-4 flex items-center justify-center">
                <Image
                  src={Stethoscope}
                  width={50}
                  height={50}
                  className="object-cover"
                  alt="Imagen de Stethoscope"
                />
              </div>
              <h3 className="text-2xl font-semibold">Atención Especializada</h3>
            </div>
            <p className="text-balance">
              Análisis minucioso de cada caso con comunicación directa entre
              médicos y aseguradoras. Agilizamos siniestros y optimizamos
              coberturas con eficiencia y calidad.
            </p>
          </div>
          <div className="shadow-lg border bg-gradient-to-b from-[#008AED] to-[#004E87] text-primary-foreground rounded-lg p-8 flex flex-col justify-center text-white">
            <div className="flex items-center mb-4">
              <Users className="w-10 h-10 mr-4" />
              <h3 className="text-2xl font-semibold">Experiencia Única</h3>
            </div>
            <p>
              Líderes en atención personalizada con equipo médico in situ.
              Acompañamiento experto y validación de cada condición de tu
              póliza.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/30"></div>
        <AnimatedCircles />
      </div>
    </div>
  );
};
