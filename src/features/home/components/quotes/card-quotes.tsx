import Image, { StaticImageData } from "next/image";
import React from "react";

interface CardQuotesProps {
  image: StaticImageData;
  textCard: string;
}

export const CardQuotes: React.FC<CardQuotesProps> = ({ image, textCard }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[265px] h-[261px]">
      <div className="w-full h-3/4 border-4 border-transparent rounded-[30px] flex justify-center items-center flex-col gradiant-border">
        <Image
          src={image}
          width={142}
          height={146}
          alt="Picture of the author"
        />
        <p className="text-lg font-bold text-[#223E99]">{textCard}</p>
      </div>
      <button
        className="mt-3 p-2 rounded-xl w-[130px]"
        style={{
          backgroundImage: "linear-gradient(to top, #223E99, #008AED)",
        }}
      >
        Ver más
      </button>
    </div>
  );
};
