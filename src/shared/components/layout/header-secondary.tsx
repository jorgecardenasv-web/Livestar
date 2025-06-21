import Image from "next/image";
import HeaderDecorator from "@/assets/shared/header_decorator.svg";
import { Navbar } from "./navbar";

export const HeaderSecondary = () => {
  return (
    <header className="relative w-full h-28 lg:h-40 text-white md:mb-10">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HeaderDecorator}
          alt="Header Decorator"
          fill
          sizes="100vw"
          className="object-cover object-top scale-110 sm:scale-105 lg:scale-100 -z-10"
          priority
        />
      </div>
      <div className="relative z-20">
        <Navbar />
      </div>
    </header>
  );
};
