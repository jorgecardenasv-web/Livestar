'use client';

import Image, { StaticImageData } from "next/image";

export const SuccessStoryCard = ({
  text,
  image,
  caseName
}:{
  text: string,
  image: StaticImageData,
  caseName: string
}) => {
  return (
    <div className="w-72 h-[444px] bg-white flex flex-col justify-center items-center rounded-xl gap-y-4">
      <Image
        src={image}
        alt="Caso 1"
        width={185}
        height={185}
        className="rounded-full"
      />
      <p className="text-xl font-bold text-[#223E99]">
        {caseName}
      </p>
      <div className="bg-gradient-to-b from-[#008AED] to-[#004E87] w-44 h-8 rounded-lg">
        <p className="text-white text-center">Diagnostico:</p>
      </div>
      <p className="uppercase text-balance text-center font-bold text-4xl bg-gradient-to-b from-[#008AED] to-[#004E87] inline-block text-transparent bg-clip-text">
        {text}
      </p>
      <button className="bg-white text-[#008AED] w-32 h-9 rounded-xl font-bold text-lg border-2 border-[#008AED]">
        Ver más
      </button>
    </div>
  );
};
