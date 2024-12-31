import { Navbar } from "./navbar";
import Image from "next/image";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
import { DrawerMenu } from '@/shared/components/layout/drawer_menu'

export const Header = () => {
  return (
    <header className="absolute top-2 xl:top-20 left-0 right-0 z-30 w-full max-w-7xl mx-auto">
      <Navbar />
      <div className="md:hidden">
      <DrawerMenu></DrawerMenu>
      </div>
      <Image
        src={Logo}
        alt="Logo principal"
        width={238}
        height={68}
        className="block sm:hidden mx-auto absolute left-0 right-0 top-6 w-auto h-auto "
        priority
      />
    </header>
  );
};
