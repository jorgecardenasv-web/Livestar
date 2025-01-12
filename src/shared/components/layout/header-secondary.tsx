import Image from "next/image";
import HeaderDecorator from "@/assets/shared/header_decorator.svg";
import { Navbar } from "./navbar";

export const HeaderSecondary = () => {
  return (
    <header className="relative w-full h-40 text-white">
      <Image
        src={HeaderDecorator}
        alt="Header Decorator"
        fill
        sizes="100vw"
        className="object-cover lg:block -z-10"
        priority
      />
      <Navbar />
    </header>
  );
};
