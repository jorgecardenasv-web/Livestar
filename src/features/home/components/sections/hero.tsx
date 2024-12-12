import Image from "next/image";

import HeroImageDesktop from "@/assets/home/hero.png";
import HeroDecorationDesktop from "@/assets/home/hero_decorator_desktop.svg";
import HeroImageMobile from "@/assets/home/hero_mobile.png";
import HeroDecorationMobile from "@/assets/home/hero_decorator_mobile.svg";

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

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col justify-center items-center min-h-screen px-4 pt-24 lg:pt-0">
        <div className="w-full flex flex-col lg:flex-row items-center justify-end gap-8">
          <div className="text-center lg:text-right lg:max-w-3xl">
            <h1 className="text-7xl font-bold text-white mb-6">
              ¡Protege tu salud y la de tu familia hoy!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Obtén una cotización rápida y sin compromiso ahora mismo y asegura
              tu bienestar y el de los que más amas.
            </p>
            <Link
              href="/cotizar"
              className="inline-flex font-bold h-14 items-center justify-center rounded bg-white px-6 text-primary hover:bg-white hover:text-gray-600 transition-colors"
            >
              Descubre más y cotiza
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
