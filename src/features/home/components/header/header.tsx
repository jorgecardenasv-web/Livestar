import { CallToAction } from "./call-to-action";
import { Navbar } from "./navbar";
import styles from "./header.module.css";
import Image from "next/image";
import Logo from "../../../../assets/images/livestar_logo_horizontal_blanco.svg";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="absolute left-0 right-0 top-0 bottom-0 mt-3">
        <Navbar />
        <Image
          src={Logo}
          alt="Logo principal"
          width={238}
          height={68}
          className="lg:hidden mx-auto absolute left-0 right-0 top-6 bottom-0"
        />
      </div>
      <div className="flex flex-col mt-16 lg:items-center w-full h-full">
        <div className="smx-auto mt-24 lg:mt-32 flex flex-col lg:flex-row justify-center text-center lg:text-left gap-y-10 items-center lg:items-start px-4">
          <div className="xl:text-left max-w-2xl text-balance text-center">
            <h1 className="text-5xl font-bold mb-4">
              ¡Protege tu salud y la de tu familia hoy!
            </h1>
            <p className="text-xl mb-6">
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
