"use client";
import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export const QuoteCard = ({
  image,
  title,
  description,
  openModal,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  openModal: (type: string, props?: Record<string, any>) => void;
}) => {
  return (
<button
  onClick={() => openModal(title)}
  className="w-full border lg:w-80 h-auto lg:h-80 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 relative group"
>
  {/* Overlay de fondo con hover solo en lg */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#008AED] to-[#004E87] opacity-0 lg:group-hover:opacity-70 transition-opacity duration-300 z-10"></div>

  {/* Contenedor principal con centrado condicional en lg */}
  <div className="flex flex-col items-center justify-center lg:items-center lg:justify-center h-full p-6 relative z-20">
    <div className="transition-all duration-300 transform lg:group-hover:-translate-y-[60%] flex flex-col items-center lg:items-center">
      <div className="w-36 h-36 lg:group-hover:w-24 lg:group-hover:h-24 bg-blue-100 rounded-full flex items-center justify-center mb-1 transition-transform duration-300">
        <Image
          src={image}
          width={110}
          height={110}
          className="object-cover lg:group-hover:w-[80px]"
          alt={`Imagen de ${title}`}
        />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 lg:group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
    </div>

    {/* Contenido visible en sm: y md: */}
    <div className="mt-4 text-center text-gray-600 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:absolute lg:bottom-6 lg:left-6 lg:right-6">
      <p className="text-gray-800 lg:text-white mb-3 text-sm">
        {description}
      </p>
      <span className="mt-2 inline-flex items-center justify-center w-full lg:w-auto text-blue-500 lg:text-white transition-colors duration-300 lg:bg-white lg:bg-opacity-20 hover:bg-opacity-10 px-4 py-2 rounded">
        Ver más
        <ArrowRight className="ml-2 w-4 h-4" />
      </span>
    </div>
  </div>

  {/* Elementos decorativos con hover solo en lg */}
  <div className="absolute top-0 -right-2.5 w-20 h-20 overflow-hidden transition-opacity duration-300 lg:group-hover:opacity-0">
    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 rotate-45 transform origin-bottom-left"></div>
    <div className="absolute top-0 right-0 w-20 h-20">
      <div className="absolute top-[2px] -right-[2px] w-6 h-6 bg-white rounded-full animate-ping"></div>
      <div className="absolute top-[2px] -right-[2px] w-6 h-6 bg-white rounded-full"></div>
    </div>
  </div>
</button>
  );
};
