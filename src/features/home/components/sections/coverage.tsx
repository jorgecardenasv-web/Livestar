import Image from "next/image";
import Link from "next/link";
import CoverageImageDesktop from "@/assets/home/bg_coverage_desktop.svg";
import CoverageImageMobile from "@/assets/home/bg_coverage_mobile.svg";

export const Coverage = () => {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[500px] lg:h-[750px] text-white py-16 md:py-24">
      <div className="absolute inset-0">
        <Image
          src={CoverageImageMobile}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={CoverageImageDesktop}
          alt=""
          fill
          sizes="(min-width: 769px) 100vw"
          className="object-cover hidden md:block"
        />
      </div>

      <div className="container mx-auto relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="flex flex-col gap-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold w-full md:w-[60%]">
            Cobertura médica amplia a precios más bajos.
          </h2>
          <p className="text-base md:text-lg lg:text-xl w-full md:w-[65%]">
            Protege tus finanzas, tu salud y la de tu familia contra accidentes
            y enfermedades.
          </p>
          <div className="mt-4">
            <Link
              href="/cotizar"
              className="inline-flex font-bold h-12 items-center justify-center rounded-lg bg-white px-6 text-[#223E99] shadow-md hover:text-primary transition-colors"
            >
              Cotizar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
