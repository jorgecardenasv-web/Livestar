import {
  Coins,
  LineChart,
  PieChart,
} from "lucide-react";

interface Concept {
  title: string;
  decription: string;
  icon: React.ReactNode;
}

const concepts: Concept[] = [
  {
    title: "PRIMA",
    icon: <Coins size={50} className="text-primary" />,
    decription:
      "Es lo que pagas para estar protegido. Varía según tu edad, tu genero, el lugar donde vives, y otros factores. ",
  },
  {
    title: "DEDUCIBLE",
    icon: <LineChart size={50} className="text-primary" />,
    decription:
      "Es la cantidad fija que debes cubrir antes de que tu seguro comience a cubrir los gastos por una enfermedad o accidente.",
  },
  {
    title: "COASEGURO",
    icon: <PieChart size={50} className="text-primary" />,
    decription:
      "Es un porcentaje a cubrir después del deducible. Es variable y tiene tope. Puede ser del: 5% 10% 15% 20%",
  },
];

export const steps = [
  {
    title: "¡Hola!",
    content:
      "Imagina tener la tranquilidad de saber que, pase lo que pase, tú y tu familia estarán cubiertos ante cualquier emergencia médica. Un Seguro de Gastos Médicos que protege tu Economía permitiendo concentrarte en lo más importante que es tu Salud.",
  },
  {
    title: "¿Qué es un seguro de Gastos Médicos Mayores?",
    content:
      "Un seguro de Gastos Médicos Mayores es tu respaldo cuando ocurre una enfermedad o accidente. Te permite acceder a los mejores hospitales y especialistas, sin que el costo sea una preocupación. El seguro te brinda la tranquilidad mientras nosotros nos encargamos de la cuenta.",
  },
  {
    title: "¿Cómo funciona? Los 3 conceptos básicos que necesitas saber:",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 mt-6">
        {concepts.map(({ title, decription, icon }) => (
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
                  {decription}
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
    ),
    footerContent: (
      <div className="text-balance leading-7">
        <p>¡No te olvides que tu prima es deducible de impuestos!</p>
        <p>Además hacienda te apoya pagando hasta el 30% de la prima.</p>
      </div>
    ),
  },
  {
    title: "¿Cómo se ve en la vida real?",
  },
];
