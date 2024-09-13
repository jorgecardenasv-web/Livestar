'use client';

import React from 'react';
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from 'lucide-react';

export const SuccessStoryCard = ({
  text,
  image,
}: {
  text: string;
  image: StaticImageData;
}) => {
  return (
    <div className="group relative w-80 md:w-72 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-[#008AED] via-[#006BBB] to-[#004E87] opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 p-6 flex flex-col items-center h-full bg-white bg-opacity-90 transition-all duration-300 group-hover:bg-opacity-95">
        <div className="mb-6 overflow-hidden rounded-full border-4 border-[#008AED] md:transition-all md:duration-300 md:group-hover:border-white">
          <Image
            src={image}
            alt={`Caso ${text}`}
            width={160}
            height={160}
            className="rounded-full md:transition-transform md:duration-300 md:group-hover:scale-110"
          />
        </div>
        <h3 className="text-xl font-bold text-[#223E99] mb-2">Diagnóstico:</h3>
        <p className="uppercase text-balance text-center font-bold text-2xl bg-gradient-to-br from-[#008AED] to-[#004E87] inline-block text-transparent bg-clip-text mb-6">
          {text}
        </p>
        <button
          onClick={() => console.log("Ver más")}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded font-bold text-lg transition-all duration-300 
                     border-2 border-[#008AED] text-[#008AED]
                     md:hover:bg-gradient-to-br md:hover:from-[#008AED] md:hover:to-[#004E87] md:hover:text-white
                     focus:outline-none focus:ring-2 focus:ring-[#008AED] focus:ring-opacity-50"
        >
          Ver más
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};