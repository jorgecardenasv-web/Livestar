import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const GreaterSpecialization = () => {
  return (
    <section className="w-full py-24 text-white">
      <div className="max-w-7xl mx-auto grid text-center place-content-center px-4 sm:px-6 lg:px-8 md:h-full text-[#666]">
        <h2 className="text-3xl sm:text-4xl font-bold text-wrap text-gradiant">
          ¿NECESITAS MAYOR ESPECIALIZACIÓN?
        </h2>
        <p className="text-lg mt-3">
          Queremos resolver personalmente tus necesidades para marcar la
          diferencia.
        </p>
        <div className="flex justify-center mt-8">
          <Link
            href="/cotizar"
            className="px-6 py-3 rounded-lg font-bold text-lg outline bg-gradient-to-br from-[#008AED] to-[#004E87] text-white shadow-md hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#008AED] focus:ring-opacity-50 flex items-center gap-x-4 mx-4"
          >
            <span className="font-bold">Quiero saber más</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};
