import Image from "next/image";
import GreaterSpecializationDesktop from "@/assets/home/bg_greater-specialization_desktop.svg";
import GreaterSpecializationMobile from "@/assets/home/bg_greater-specialization_mobile.svg";

export const GreaterSpecialization = () => {
  return (
    <section className="w-full h-72 md:h-96 text-white mb-8">
      <div className="max-w-7xl mx-auto grid text-center place-content-center px-4 sm:px-6 lg:px-8 md:h-full text-[#666]">
        <h2 className="text-4xl font-bold text-wrap text-gradiant">
          ¿NECESITAS MAYOR ESPECIALIZACIÓN?
        </h2>
        <p className="text-lg mt-3">
          Queremos resolver personalmente tus necesidades para marcar la
          diferencia.
        </p>
        <div className="flex justify-center mt-8">
          <button className="px-4 py-3 rounded font-bold text-lg outline bg-[#008AED] text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-[#008AED] hover:to-[#004E87] focus:outline-none focus:ring-2 focus:ring-[#008AED] focus:ring-opacity-50">
            <span className="font-bold">Quiero saber más.</span>
          </button>
        </div>
      </div>
    </section>
  );
};
