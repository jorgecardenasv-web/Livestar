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
          <span className="text-primary font-bold">Economía</span> permitiendo
          concentrarte en lo más importante que es tu{" "}
          <span className="text-primary font-bold">Salud</span>.
        </p>
      </>
    ),
  },
  {
    id: "¿Qué es un seguro de Gastos Médicos Mayores?",
    component: (
      <>
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
          ¿Qué es un seguro de Gastos Médicos Mayores?
        </h2>
        <p className="text-gray-600 text-lg text-center leading-8 text-balance">
          Un seguro de Gastos Médicos Mayores es tu respaldo cuando ocurre una
          enfermedad o accidente. Te permite acceder a los mejores hospitales y
          especialistas, sin que el costo sea una preocupación. El seguro te
          brinda la tranquilidad mientras nosotros nos encargamos de la cuenta.
        </p>
      </>
    ),
  },
  {
    id: "¿Cómo funciona? Los 3 conceptos básicos que necesitas saber:",
    component: <Conceptos />,
  },
  {
    id: "¿Cómo se ve en la vida real?",
    component: <Component />,
  },
];
