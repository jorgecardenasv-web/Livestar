import React from "react";
import "./coverage.css";
import Image from "next/image";
import recurso3 from "../../../../assets/home/recurso3.svg";
import recurso4 from "../../../../assets/home/recurso4.svg";

export const Coverage = () => {
  return (
    <div className="w-full h-[700px] background-gradient container-coverage flex justify-center items-center flex-col ">
      <div className="flex flex-col justify-start w-full gap-8 text-container p-6 relative z-20 sm:w-full md:w-full md:p-10 lg:w-full xl:w-2/4 lg:top-[-61px] md:top-0">
        <h2 className="text-6xl font-bold w-full sm:w-[100%] md:w-[65%]">
          Cobertura médica amplia a precios más bajos.
        </h2>
        <p className="text-lg sm:w-[100%] md:w-[65%]">
          Protege tus finanzas, tu salud y la de tu familia contra accidentes y
          enfermedades
        </p>
        <button className="w-20 button-coverage text-lg">ver más</button>
      </div>

      <Image
        src={recurso3}
        width={650}
        height={650}
        alt="imagen fondo"
        className="absolute right-[5%] bottom-2 z-10 hidden lg:block"
      />

      <Image
        src={recurso4}
        width={400}
        height={400}
        alt="imagen fondo"
        className="absolute right-[5%] bottom-2 z-10 block lg:hidden"
      />
    </div>
  );
};
