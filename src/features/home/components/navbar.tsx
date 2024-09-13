import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";

export const Navbar = () => {
  return (
    <>
      <div className="hidden max-w-6xl justify-between md:flex pt-10 items-center mx-auto text-white">
        <Link href="/">
          <Image src={Logo} alt="Logo Principal" width={238} height={68} />
        </Link>
        <nav className="flex gap-x-10 items-center font-bold">
          <Link
            href="#"
            className="px-5 py-2 bg-white text-[#008AED] rounded"
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
