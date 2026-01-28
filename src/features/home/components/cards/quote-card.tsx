"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export const QuoteCard = ({
  image,
  title,
  description,
  href,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <div className="w-full lg:w-80 flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-slate-200/70 bg-white/80 min-h-[260px] md:min-h-[280px]">
      <div className="w-24 h-24 rounded-full bg-[#E6F3FF] flex items-center justify-center mx-auto mb-4">
        <Image
          src={image}
          width={72}
          height={72}
          className="object-cover"
          alt={`Imagen de ${title}`}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#00AEEF] text-white text-sm font-semibold uppercase tracking-wide shadow-md hover:bg-[#009bd5] transition-transform transform hover:-translate-y-0.5"
      >
        Conoce más
      </Link>
    </div>
  );
};
