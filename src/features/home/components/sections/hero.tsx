import Image from "next/image";
import HeroImageDesktop from "@/assets/home/hero.png";
import HeroDecorationDesktop from "@/assets/home/hero_decorator_desktop.svg";
import HeroImageMobile from "@/assets/home/hero_mobile.png";
import HeroDecorationMobile from "@/assets/home/hero_decorator_mobile.svg";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { sendEmailAction } from "@/sendEmail";

export const Hero = () => {
  return (
    <div className="relative w-full min-h-[100dvh] max-h-[900px] mb-20">
      <div className="absolute inset-0">
        {/* Versión móvil */}
        <Image
          src={HeroImageMobile}
          alt="Hero Mobile"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover md:hidden"
          priority
        />
        <Image
          src={HeroDecorationMobile}
          alt="Hero Decoration Mobile"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover z-10 md:hidden"
          priority
        />

        {/* Versión desktop */}
        <Image
          src={HeroImageDesktop}
          alt="Hero Desktop"
          fill
          sizes="(min-width: 769px) 100vw"
          className="object-cover hidden md:block"
          quality={90}
          priority
        />
        <Image
          src={HeroDecorationDesktop}
          alt="Hero Decoration Desktop"
          fill
          sizes="(min-width: 769px) 100vw"
          className="object-cover z-10 hidden md:block"
          priority
        />
      </div>

      <div className="container relative mx-auto z-10 min-h-[100dvh] max-h-[900px] flex">
        <div className="w-full flex items-center mt-16 md:mt-0">
          <div className="w-full flex flex-col md:flex-row items-center justify-end gap-4 md:gap-8">
            <div className="text-center md:text-right w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl md:ml-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                ¡Protege tu salud y la de tu familia hoy!
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
                Obtén una cotización rápida y sin compromiso ahora mismo y asegura
                tu bienestar y el de los que más amas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <form action={sendEmailAction}>
                  <Button type="submit" className="w-full sm:w-auto">
                    Enviar correo
                  </Button>
                </form>
                <Link
                  href="/cotizar"
                  className="inline-flex font-bold h-14 items-center justify-center rounded bg-white px-6 text-[#223E99] hover:text-primary transition-colors w-full sm:w-auto"
                >
                  Descubre más y cotiza
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
