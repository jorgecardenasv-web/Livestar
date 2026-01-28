"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
import { Car, HeartPulse, Hospital, Hotel, HomeIcon as House } from "lucide-react";
import { NavbarMobile } from "./navbar.mobil";
import { NewQuoteButton } from "./new-quote.button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isQuoteRoute = pathname?.startsWith("/cotizar") || pathname === "/finalizar-cotizacion";

  return (
    <nav className="text-white pt-4 pb-4 md:pt-8 container">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between h-auto lg:h-20">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={Logo}
              alt="Logo Livestar"
              width={200}
              height={58}
              className="w-[140px] sm:w-[180px] lg:w-[180px] 2xl:w-[238px]"
              priority
            />
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <NavbarMobile />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
                  <span>Cotizadores</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden ring-1 ring-black/5 transform origin-top-left">
                  <div className="py-2">
                    <Link
                      href="https://livestar.mx/emma/ahorro.php"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <HeartPulse className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">EMMA Ahorro</span>
                    </Link>
                    <Link
                      href="https://livestar.com.mx/seguro/segurodevida.php"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <Hospital className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Seguro de Vida</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium text-sm lg:text-base">
                  <span>Seguros</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden ring-1 ring-black/5 transform origin-top-left">
                  <div className="py-2">
                    <Link
                      href="https://livestar.mx/seguros/vida/"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <HeartPulse className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Vida</span>
                    </Link>
                    <Link
                      href="https://livestar.mx/seguros/gastos-medicos/"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <Hospital className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Gastos Médicos</span>
                    </Link>
                    <Link
                      href="https://livestar.mx/seguros/vehiculos/"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <Car className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Vehículos</span>
                    </Link>
                    <Link
                      href="https://livestar.mx/seguros/empresas/"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <Hotel className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Empresas</span>
                    </Link>
                    <Link
                      href="https://livestar.mx/seguros/hogar/"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#223E99] transition-colors"
                    >
                      <House className="w-5 h-5 mr-3 text-[#00AEEF]" />
                      <span className="font-medium">Hogar</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base">
                <Link
                  href="https://livestar.mx/nosotros/"
                  className="text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all font-medium whitespace-nowrap"
                >
                  Nosotros
                </Link>
                <Link
                  href="https://livestar.mx/contacto/"
                  className="text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all font-medium whitespace-nowrap"
                >
                  Contacto
                </Link>
                <Link
                  href="https://livestar.mx/en-confianza/"
                  className="text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all font-medium whitespace-nowrap"
                >
                  En confianza
                </Link>
              </div>
            </div>

            {isQuoteRoute && <div className="h-8 w-px bg-white/20 mx-2" />}
            {isQuoteRoute && <NewQuoteButton />}
          </div>
        </div>

        {isQuoteRoute && (
          <div className="lg:hidden w-full flex justify-center mt-2 mb-1">
            <NewQuoteButton className="px-4 py-2 text-sm shadow-none" />
          </div>
        )}
      </div>
    </nav>
  );
};
