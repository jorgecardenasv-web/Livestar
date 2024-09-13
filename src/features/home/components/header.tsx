import { Navbar } from "./navbar";
import Image from "next/image";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";

export const Header = () => {
  return (
    <header className="absolute top-2 left-0 right-0 z-30 w-full">
      <Navbar />
      <Image
        src={Logo}
        alt="Logo principal"
        width={238}
        height={68}
        className="lg:hidden mx-auto absolute left-0 right-0 top-6 w-auto h-auto"
        priority
      />
    </header>
  );
};
