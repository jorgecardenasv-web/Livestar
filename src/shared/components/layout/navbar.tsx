"use client";

import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg"
import { Car, HeartPulse, Hospital, Hotel, HomeIcon as House, Menu, ChevronDown, X } from 'lucide-react'
import { NavbarMobile } from "./navbar.mobil";
import { NewQuoteButton } from "./new-quote.button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isQuoteRoute = pathname?.startsWith('/cotizar') || pathname === '/finalizar-cotizacion';

  return (
    <nav className="text-white md:pt-8 container">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={Logo}
            alt="Logo Principal"
            width={200}
            height={58}
            className="w-[140px] sm:w-[180px] lg:w-[180px] 2xl:w-[238px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-8">
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
            {
              isQuoteRoute &&
              <NewQuoteButton />
            }

            <div className="relative group">
              <button className="flex items-center gap-1 px-3 lg:px-4 xl:px-6 py-2 bg-white text-[#223E99] rounded-md hover:bg-opacity-90 transition-colors font-medium text-sm lg:text-base">
                <span>Cotizadores</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu Cotizadores */}
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="https://livestar.mx/emma/ahorro.php" className="flex items-center px-4 py-2 text-[#223E99] hover:bg-gray-100 transition-colors">
                    <HeartPulse className="w-5 h-5 mr-2" />
                    <span>EMMA Ahorro</span>
                  </Link>
                  <Link href="https://livestar.com.mx/seguro/segurodevida.php" className="flex items-center px-4 py-2 text-[#223E99] hover:bg-gray-100 transition-colors">
                    <Hospital className="w-5 h-5 mr-2" />
                    <span>Seguro de Vida</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors font-medium text-sm lg:text-base">
              <span>Seguros</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-60 bg-[#223E99] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link href="https://livestar.mx/seguros/vida/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                  <HeartPulse className="w-5 h-5 mr-2" />
                  <span>Vida</span>
                </Link>
                <Link href="https://livestar.mx/seguros/gastos-medicos/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                  <Hospital className="w-5 h-5 mr-2" />
                  <span>Gastos Médicos</span>
                </Link>
                <Link href="https://livestar.mx/seguros/vehiculos/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                  <Car className="w-5 h-5 mr-2" />
                  <span>Vehículos</span>
                </Link>
                <Link href="https://livestar.mx/seguros/empresas/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                  <Hotel className="w-5 h-5 mr-2" />
                  <span>Empresas</span>
                </Link>
                <Link href="https://livestar.mx/seguros/hogar/" className="flex items-center px-4 py-2 hover:bg-[#00BFFF] transition-colors">
                  <House className="w-5 h-5 mr-2" />
                  <span>Hogar</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 lg:gap-4 xl:gap-8 text-sm lg:text-base">
            <Link href="https://livestar.mx/nosotros/" className="text-white hover:text-gray-200 transition-colors font-medium whitespace-nowrap">
              Nosotros
            </Link>
            <Link href="https://livestar.mx/contacto/" className="text-white hover:text-gray-200 transition-colors font-medium whitespace-nowrap">
              Contacto
            </Link>
            <Link href="https://livestar.mx/en-confianza/" className="text-white hover:text-gray-200 transition-colors font-medium whitespace-nowrap">
              En confianza
            </Link>
          </div>
        </div>

        {/* Mobile menu button and content */}
        <div className="flex items-center gap-5">
          {isQuoteRoute && (
            <div className="lg:hidden">
              <NewQuoteButton />
            </div>
          )}
          <NavbarMobile />
        </div>
      </div>
    </nav>
  );
};
