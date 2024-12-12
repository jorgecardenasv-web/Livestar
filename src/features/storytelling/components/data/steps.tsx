import Component from "../steps/exercices";
import { Conceptos } from "../steps/conceptos";

export const steps = [
  {
    id: "Inicio",
    component: (
      <>
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
          ¡Hola!
        </h2>
        <p className="text-gray-600 text-lg text-balance text-center leading-8">
          Imagina tener la tranquilidad de saber que, pase lo que pase, tú y tu
          familia estarán cubiertos ante cualquier emergencia médica. Un{" "}
          <span className="text-primary font-bold">
            Seguro de Gastos Médicos
          </span>{" "}
          que protege tu{" "}
          <span className="text-primary font-bold">economía</span> permitiendo
          concentrarte en lo más importante, que es tu{" "}
          <span className="text-primary font-bold">salud</span>.
        </p>
      </>
    ),
  },
  {
    id: "¿Qué es un Seguro de Gastos Médicos Mayores?",
    component: (
      <>
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
        ¿Qué es un seguro de gastos médicos mayores?
        </h2>
        <p className="text-gray-600 text-lg text-center leading-8 text-balance">
          Es tu <span className="text-primary font-bold">respaldo</span> cuando
          ocurre una enfermedad o accidente. Te permite acceder a los mejores
          hospitales y especialistas, sin que el costo sea una preocupación. El
          seguro te brinda la{" "}
          <span className="text-primary font-bold">tranquilidad</span> mientras
          nosotros nos encargamos de la cuenta.
        </p>
      </>
    ),
  },
  {
    id: "¿Cómo funciona?",
    component: <Conceptos />,
  },
  {
    id: "¿Cómo se ve en la vida real?",
    component: <Component />,
  },
];
