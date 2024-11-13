import Image from "next/image";

import HeroImageDesktop from "@/assets/home/hero.png";
import HeroDecorationDesktop from "@/assets/home/hero_decorator_desktop.svg";
import HeroImageMobile from "@/assets/home/hero_mobile.png";
import HeroDecorationMobile from "@/assets/home/hero_decorator_mobile.svg";

import { CallToAction } from "../call-to-action";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-screen text-white">
      <div className="absolute inset-0">
        <Image
          src={HeroImageMobile}
          alt="Hero Mobile"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          priority
        />
        <Image
          src={HeroImageDesktop}
          alt="Hero Desktop"
          fill
          sizes="100vw"
          className="object-cover hidden lg:block"
          priority
        />
        <Image
          src={HeroDecorationMobile}
          alt="Hero Decoration Mobile"
          fill
          sizes="100vw"
          className="object-cover z-10 lg:hidden"
          priority
        />
        <Image
          src={HeroDecorationDesktop}
          alt="Hero Decoration Desktop"
          fill
          sizes="100vw"
          className="object-cover z-10 hidden lg:block"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col justify-center items-center min-h-screen px-4 pt-24 lg:pt-0">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left lg:max-w-xl">
            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
              ¡Protege tu salud y la de tu familia hoy!
            </h1>
            <p className="text-lg md:text-xl mb-4 md:mb-6 text-white">
              Obtén una cotización rápida y sin compromiso ahora mismo y asegura
              tu bienestar y el de los que más amas.
            </p>
            <button className="bg-white text-[#008AED] py-3 px-6 rounded font-bold text-base md:text-lg">
              Quiero saber más.
            </button>
          </div>
          <div className="w-full lg:w-auto">
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
};
