"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

import Logo from "@/assets/shared/Logo.svg";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r text-[#666666] pt-2 pb-4 border-t border-[#666666]/15">
      <div className="container mx-auto px-4 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image src={Logo} width={257} height={158} alt={"Logo empresa"} />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="transition-colors">
                Seguros
              </Link>
              <Link href="#" className="transition-colors">
                Simulador Seguro de Vida
              </Link>
              <Link href="#" className="transition-colors">
                Cotizadores
              </Link>
              <Link href="#" className="transition-colors">
                Nosotros
              </Link>
              <Link href="#" className="transition-colors">
                Contacto
              </Link>
              <Link href="#" className="transition-colors">
                En confianza
              </Link>
              <Link href="/aviso-de-Privacidad" className="transition-colors">
                Aviso de Privacidad
              </Link>
            </nav>
          </div>
          <div className="flex flex-col items-center md:items-start text-[#666666]">
            <h3 className="font-semibold text-lg mb-4">Contáctanos</h3>
            <address className="not-italic text-sm">
              Plaza Concentro
              <br />
              Av Vallarta Pte. No. 6503
              <br />
              Local B5-5A
              <br />
              Ciudad Granja, 45010
              <br />
              Zapopan, Jal, México
            </address>
            <div className="mt-4 space-y-2">
              <p className="text-sm">contacto@livestar.mx</p>
              <p className="text-sm">(33) 3110 1122</p>
              <p className="text-sm">(33) 1810 1118</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#666666]/15 flex justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Livestar. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="transition-colors">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="transition-colors">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
