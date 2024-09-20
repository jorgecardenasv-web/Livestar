"use client";
import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export const QuoteCard = ({
  image,
  title,
  description,
}: {
  image: StaticImageData;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full border max-w-xs sm:w-72 h-auto sm:h-80 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 sm:hover:shadow-xl relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-[#008AED] to-[#004E87] opacity-0 sm:group-hover:opacity-70 transition-opacity duration-300 z-10"></div>

      <div className="flex flex-col items-center sm:justify-center h-full p-6 relative z-20">
        <div className="transition-all duration-300 transform sm:group-hover:-translate-y-[60%] flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-1 sm:group-hover:scale-90 transition-transform duration-300">
            <Image
              src={image}
              width={80}
              height={80}
              className="object-cover"
              alt={`Imagen de ${title}`}
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 sm:group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="mt-4 text-center text-gray-600 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:absolute sm:bottom-6 sm:left-6 sm:right-6">
          <p className="text-gray-800 sm:text-white mb-3 text-sm">
            {description}
          </p>
          <button
            onClick={() => console.log("Ver más")}
            className="mt-2 inline-flex items-center justify-center w-full sm:w-auto text-blue-500 sm:text-white transition-colors duration-300 sm:bg-white sm:bg-opacity-20 hover:bg-opacity-10 px-4 py-2 rounded text-"
          >
            Ver más
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="absolute top-0 -right-1 w-20 h-20 overflow-hidden transition-opacity duration-300 sm:group-hover:opacity-0">
        <div className="absolute top-0 right-0 w-6 h-6 bg-blue-500 rotate-45 transform origin-bottom-left"></div>
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-[2px] right-[1px] w-4 h-4 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-[2px] right-[1px] w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
