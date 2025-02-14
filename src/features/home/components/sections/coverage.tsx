import Image from "next/image";
import CoverageImageDesktop from "@/assets/home/bg_coverage_desktop.svg";
import CoverageImageMobile from "@/assets/home/bg_coverage_mobile.svg";

export const Coverage = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[750px] text-white py-24">
      <div className="absolute inset-0">
        <Image
          src={CoverageImageMobile}
          alt="Coverage Mobile"
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover md:hidden"
          priority
        />
        <Image
          src={CoverageImageDesktop}
          alt="Coverage Desktop"
          fill
          sizes="(min-width: 769px) 100vw"
          className="object-cover hidden md:block"
          priority
        />
      </div>

      <div className="container mx-auto relative h-full flex flex-col justify-center">
        <div className="flex flex-col gap-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold w-full md:w-[65%]">
            Cobertura médica amplia a precios más bajos.
          </h2>
          <p className="text-base md:text-lg lg:text-xl w-full md:w-[65%]">
            Protege tus finanzas, tu salud y la de tu familia contra accidentes
            y enfermedades.
          </p>
        </div>
      </div>
    </section>
  );
};
