import Image from "next/image";
import HeaderDecorator from "@/assets/shared/header_decorator.svg";
import { Navbar } from "./navbar";

export const HeaderSecondary = () => {
  return (
    <header className="relative w-full md:h-40 text-white">
      <Image
        src={HeaderDecorator}
        alt="Header Decorator"
        fill
        sizes="100vw"
        className="object-cover block -z-10"
        priority
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 absolute inset-0 md:h-full text-[#666]">
        <Navbar />
      </div>
    </header>
  );
};
