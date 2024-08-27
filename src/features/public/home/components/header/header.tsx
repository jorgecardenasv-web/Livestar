import { CallToAction } from "../call-to-action";
import { Navbar } from "../navbar";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Navbar />
        <div className="mx-auto mt-24 lg:mt-24 flex flex-col lg:flex-row justify-center text-center lg:text-left gap-y-10 items-center lg:items-start px-4">
          <div className="xl:text-left max-w-2xl text-balance text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              ¡Protege tu salud y la de tu familia hoy!
            </h1>
            <p className="text-lg xl:text-xl mb-6">
              Obtén una cotización rápida y sin compromiso ahora mismo y asegura
              tu bienestar y el de los que más amas.
            </p>
            <button className="bg-white text-[#008AED] px-6 py-3 rounded-xl font-bold text-lg">
              Quiero saber más
            </button>
          </div>
          <CallToAction />
        </div>
      </div>
    </header>
  );
};
