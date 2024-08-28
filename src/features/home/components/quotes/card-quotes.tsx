import Image, { StaticImageData } from "next/image";
import React from "react";

interface CardQuotesProps {
  image: StaticImageData;
  textCard: string;
}

export const CardQuotes: React.FC<CardQuotesProps> = ({ image, textCard }) => {
  return (
    <div className="flex flex-col justify-center items-center min-w-[290px] max-w-[290px]  h-[300px] flex-1">
      <div className="w-full h-3/4 border-4 border-transparent rounded-[30px] flex justify-center items-center flex-col gradiant-border">
        <Image
          src={image}
          width={175}
          height={175}
          alt="Picture of the author"
        />
        <p className="text-lg mt-4 font-bold text-gradiant">{textCard}</p>
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
