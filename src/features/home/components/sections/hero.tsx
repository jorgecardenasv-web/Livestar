import Image from "next/image";

import HeroImageDesktop from "@/assets/home/hero.png";
import HeroDecorationDesktop from "@/assets/home/hero_decorator_desktop.svg";
import HeroImageMobile from "@/assets/home/hero_mobile.png";
import HeroDecorationMobile from "@/assets/home/hero_decorator_mobile.svg";

import { CallToAction } from "../call-to-action";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-screen">
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

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col justify-center items-end min-h-screen px-4 pt-24 lg:pt-0">
        <div className="text-center lg:text-right lg:max-w-4xl space-y-12">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-7xl font-bold text-white text-balance leading-8">
              ¡Protege tu salud y la de tu familia hoy!
            </h1>
            <p className="text-xl md:text-xl text-white text-balance leading-10">
              Obtén una cotización rápida y sin compromiso ahora mismo y asegura
              tu bienestar y el de los que más amas.
            </p>
          </div>
          <div>
            <Link
              href="/cotizar"
              className="bg-white hover:bg-primary lg:w-5/6 mx-auto text-primary hover:text-white px-6 py-4 rounded font-bold text-lg w-full"
            >
              Descubre más y cotiza
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
