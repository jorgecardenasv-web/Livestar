import { Coins, LineChart, PieChart } from "lucide-react";

interface Concept {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const concepts: Concept[] = [
  {
    title: "PRIMA",
    icon: <Coins size={50} className="text-primary" />,

    description:
      "Es lo que pagas para estar protegido. Varía según tu edad, tu género, el lugar donde vives y otros factores.",
  },
  {
    title: "DEDUCIBLE",
    icon: <LineChart size={50} className="text-primary" />,

    description:
      "Es la cantidad fija que debes cubrir antes de que tu seguro comience a pagar los gastos por una enfermedad o accidente.",
  },
  {
    title: "COASEGURO",
    icon: <PieChart size={50} className="text-primary" />,

    description:
      "Es un porcentaje a cubrir después del deducible. Es variable y tiene tope. Puede ser de entre el 5% o hasta el 20%. Pudiendo ser del 0% de la cuenta hospitalaria.",
  },
];

export const Conceptos = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-3">
          ¿Cómo funciona?
        </h2>
        <h4 className="text-xl font-semibold text-center text-gray-600 mb-6">
          Los 3 conceptos básicos que necesitas saber
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 mt-6">
        {concepts.map(({ title, description, icon }) => (
          <div
            key={title}
            className="border bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 sm:hover:shadow-xl relative group w-52 h-60"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#008AED] to-[#004E87] opacity-0 sm:group-hover:opacity-70 transition-opacity duration-300 z-10"></div>

            <div className="flex flex-col items-center sm:justify-center h-full p-6 relative z-20">
              <div className="transition-all duration-300 transform sm:group-hover:-translate-y-[60%] flex flex-col items-center">
                <div className="w-28 h-28 group-hover:hidden bg-blue-100 rounded-full flex items-center justify-center mb-1 transition-transform duration-300">
                  {icon}
                </div>
                <p className="text-xl font-bold text-gray-600 sm:group-hover:hidden transition-colors duration-300">
                  {title}
                </p>
              </div>

              <div className="mt-4 text-center text-gray-600 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 sm:absolute sm:left-6 sm:right-6">
                <p className="text-gray-800 sm:text-white mb-3 leading-6 text-balance">
                  {description}
                </p>
              </div>
            </div>

            <div className="absolute top-0 -right-2.5 w-10 h-10 overflow-hidden transition-opacity duration-300 sm:group-hover:opacity-0">
              <div className="absolute top-0 right-0 w-6 h-6 bg-primary rotate-45 transform origin-bottom-left"></div>
              <div className="absolute top-0 right-0 w-10 h-10">
                <div className="absolute top-[1px] -right-[1px] w-4 h-4 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-[1px] -right-[1px] w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-balance leading-7 text-center">
        <p>¡No te olvides que tu prima es deducible de impuestos!</p>
        <p>
          Hacienda te apoya pagando hasta el 30% del costo de tu seguro de
          gastos médicos.
        </p>
      </div>
    </div>
  );
};
