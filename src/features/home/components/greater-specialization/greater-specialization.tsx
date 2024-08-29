import React from "react";
import "./greater-specialization.css";
import { addAdvisorSchema } from "../../../advisors/schemas/add-advisor";
export const GreaterSpecialization = () => {
  return (
    <section className="w-full h-[600px] flex flex-col items-center justify-center gap-4 specialization-container background-gradient-primary">
      <h2 className="text-6xl font-bold text-center md:text-left  ">
        ¿NECESITAS MAYOR ESPECIALIZACIÓN?
      </h2>
      <p className="text-lg text-center md:text-left ">
        Queremos resolver personalmente tus necesidades para marcar la
        diferencia.
      </p>
      <button className="button-custom">
        <span className="text-gradiant font-bold">Quiero saber más</span>
      </button>
    </section>
  );
};
