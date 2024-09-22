import Image from "next/image";
import GreaterSpecializationDesktop from "@/assets/home/bg_greater-specialization_desktop.svg";
import GreaterSpecializationMobile from "@/assets/home/bg_greater-specialization_mobile.svg";

export const GreaterSpecialization = () => {
  return (
    <section className="relative w-full h-screen md:h-96 text-white my-12">
      <div className="absolute inset-0">
        <Image
          src={GreaterSpecializationMobile}
          alt="Success Story Mobile"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          priority
        />
        {/* <Image
          src={GreaterSpecializationDesktop}
          alt="Success Story Desktop"
          fill
          sizes="100vw"
          className="object-cover hidden lg:block"
          priority
        /> */}
      </div>

      <div className="max-w-7xl mx-auto grid place-content-center px-4 sm:px-6 lg:px-8 absolute inset-0 md:h-full text-[#666]">
        <h2 className="text-4xl font-bold text-center md:text-lef text-wrap text-gradiant">
          ¿NECESITAS MAYOR ESPECIALIZACIÓN?
        </h2>
        <p className="text-lg mt-3 text-center md:text-left">
          Queremos resolver personalmente tus necesidades para marcar la
          diferencia.
        </p>
        <div className="flex justify-center mt-8">
        <button className="px-4 py-3 rounded font-bold text-lg outline">
          <span className="font-bold">Quiero saber más</span>
        </button>
        </div>
      </div>
    </section>
  );
};
