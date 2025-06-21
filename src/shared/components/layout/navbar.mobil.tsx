"use client";

import { Car, ChevronDown, HeartPulse, Hospital, Hotel, House, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg"
import { useState } from "react";
import { NewQuoteButton } from "./new-quote.button";

export function NavbarMobile({
  isQuoteRoute
}: {
  isQuoteRoute: boolean
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className="lg:hidden relative z-50">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-md hover:bg-[#00BFFF] transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#223E99] text-white p-0">
          <nav className="flex flex-col h-full">
            <div className="p-4 border-b border-white/10">
              <Image
                src={Logo}
                alt="Logo Principal"
                width={200}
                height={58}
                className="w-[180px]"
              />
            </div>
            <div className="flex-grow overflow-y-auto">
              <div className="px-4 py-6 space-y-6">
                <button className="w-full text-left px-3 py-2 bg-white text-[#223E99] rounded-md font-medium">
                  Cotizadores
                </button>

                <div>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium"
                  >
                    <span>Seguros</span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className="mt-2 pl-4 space-y-2">
                      <Link href="https://livestar.mx/seguros/vida/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                        <HeartPulse className="w-5 h-5 mr-2" />
                        <span>Vida</span>
                      </Link>
                      <Link href="https://livestar.mx/seguros/gastos-medicos/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                        <Hospital className="w-5 h-5 mr-2" />
                        <span>Gastos Médicos</span>
                      </Link>
                      <Link href="https://livestar.mx/seguros/vehiculos/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                        <Car className="w-5 h-5 mr-2" />
                        <span>Vehículos</span>
                      </Link>
                      <Link href="https://livestar.mx/seguros/empresas/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                        <Hotel className="w-5 h-5 mr-2" />
                        <span>Empresas</span>
                      </Link>
                      <Link href="https://livestar.mx/seguros/hogar/" className="flex items-center px-3 py-2 text-white hover:text-gray-200 transition-colors">
                        <House className="w-5 h-5 mr-2" />
                        <span>Hogar</span>
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="https://livestar.mx/nosotros/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                  Nosotros
                </Link>
                <Link href="https://livestar.mx/contacto/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                  Contacto
                </Link>
                <Link href="https://livestar.mx/en-confianza/" className="block px-3 py-2 text-white hover:text-gray-200 transition-colors font-medium">
                  En confianza
                </Link>
                {
                  isQuoteRoute &&
                  <NewQuoteButton />
                }
              </div>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}