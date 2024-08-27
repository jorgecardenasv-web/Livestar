import Image from "next/image";
import Link from "next/link";
import Logo from "@/shared/assets/images/livestar_logo_horizontal_blanco.svg";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 xl:hidden">
        <button className="text-white z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Image
          src={Logo}
          alt="Logo Principal"
          width={120}
          height={34}
          className="hidden lg:block"
        />
      </div>
      <div className="hidden xl:flex justify-evenly pt-10 items-center container mx-auto w-[1100px]">
        <Link href="index.html">
          <Image src={Logo} alt="Logo Principal" width={238} height={68} />
        </Link>
        <nav className="flex gap-x-10 items-center font-bold">
          <Link
            href="#"
            className="px-5 py-2 bg-white text-[#008AED] rounded-xl"
          >
            Cotizadores
          </Link>
          <Link href="#">Seguros</Link>
          <Link href="#">Nosotros</Link>
          <Link href="#">Contacto</Link>
          <Link href="#">En confianza</Link>
        </nav>
      </div>
    </>
  );
};
