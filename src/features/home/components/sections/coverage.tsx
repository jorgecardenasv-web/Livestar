import Image from "next/image";
import CoverageImageDesktop from "@/assets/home/bg_coverage_desktop.svg";
import CoverageImageMobile from "@/assets/home/bg_coverage_mobile.svg";

export const Coverage = () => {
  return (
    <section className="relative w-full h-screen md:h-[600px] text-white my-16">
      <div className="absolute inset-0">
        <Image
          src={CoverageImageMobile}
          alt="Coverage Mobile"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          priority
        />
        <Image
          src={CoverageImageDesktop}
          alt="Coverage Desktop"
          fill
          sizes="100vw"
          className="object-cover hidden lg:block"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0">
        <div className="flex flex-col justify-center h-full gap-y-6 text-container">
          <h2 className="text-5xl font-bold w-full sm:w-[100%] md:w-[65%]">
            Cobertura médica amplia a precios más bajos.
          </h2>
          <p className="text-xl sm:w-[100%] md:w-[65%]">
            Protege tus finanzas, tu salud y la de tu familia contra accidentes
            y enfermedades.
          </p>
          <button className="w-52 relative bg-transparent hover:bg-[#223E99] hover:text-white border-0 px-4 py-2 rounded overflow-hidden transition-colors duration-300">
            <span className="relative z-10 font-semibold text-lg">Ver más</span>
            <span
              className="absolute inset-0 rounded-md"
              style={{
                background: "linear-gradient(to right, white, #539EC8)",
                content: "''",
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
