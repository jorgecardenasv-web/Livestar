import Image from "next/image";
import React from "react";
import logo from "../../../../assets/home/Logo.svg";

export const FooterPage = () => {
  return (
    <footer className="w-full h-auto flex flex-col md:flex-row justify-evenly items-center md:items-start pt-10 mt-5 pb-10">
      <div className="icon-container mb-4 md:mb-0">
        <Image src={logo} width={300} height={300} alt={"Logo empresa"} />
      </div>
      <div className="mb-4 md:mb-0">
        <ul className="leading-7 text-lg">
          <li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plaza+Concentro,+Zapopan,+Jalisco,+México"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008AED]"
            >
              Plaza Concentro
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plaza+Concentro,+Zapopan,+Jalisco,+México"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008AED]"
            >
              Av Vallarta Pte. No. 6503
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plaza+Concentro,+Zapopan,+Jalisco,+México"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008AED]"
            >
              Local B5-5A
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plaza+Concentro,+Zapopan,+Jalisco,+México"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008AED]"
            >
              Ciudad Granja, 45010
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plaza+Concentro,+Zapopan,+Jalisco,+México"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008AED]"
            >
              Zapopan, Jal, México
            </a>
          </li>
        </ul>
      </div>
      <div className="mb-4 md:mb-0">
        <ul className="list-disc leading-7 text-lg">
          <li className="text-[#223E99] font-bold">Seguros</li>
          <li className="ml-4 text-[#223E99] font-bold">
            Simulador Seguro de Vida
          </li>
          <li className="text-[#223E99] font-bold">Cotizadores</li>
          <li className="text-[#223E99] font-bold">Nosotros</li>
          <li className="text-[#223E99] font-bold">Contacto</li>
          <li className="text-[#223E99] font-bold">En confianza</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 mb-5 w-full md:w-[400px]">
        <div className="w-[250px] mx-auto md:mx-0">
          <p className="text-lg font-bold text-[#008AED]">
            La información es valiosa. Síguenos en redes y mantente actualizado
            de la mano de nuestros expertos
          </p>
        </div>

        <div className="flex flex-row justify-around md:flex-col gap-5">
          <ul className="leading-7 text-lg text-center md:text-left">
            <li className="text-[#223E99] underline">
              <a href="#">Facebook</a>
            </li>
            <li className="text-[#223E99] underline">
              <a href="#">TikTok</a>
            </li>
            <li className="text-[#223E99] underline">
              <a href="#">Instagram</a>
            </li>
          </ul>

          <ul className="text-lg text-center md:text-left">
            <li>
              <a href="mailto:contacto@livestar.mx" className="text-[#223E99] ">
                contacto@livestar.mx
              </a>
            </li>
            <li>
              <a href="tel:+523331101122" className="text-[#223E99] ">
                (33) 3110 1122
              </a>
            </li>
            <li>
              <a href="tel:+523318101118" className="text-[#223E99] ">
                (33) 1810 1118
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
