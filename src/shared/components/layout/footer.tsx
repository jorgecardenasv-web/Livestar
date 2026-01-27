"use client"

import type React from "react"

import Link from "next/link"
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/shared/components/icons/social-icons"
import Logo from "@/assets/shared/Logo.svg"
import Image from "next/image"

const quickLinks = {
  seguros: [
    { name: "Vida", href: "https://livestar.mx/seguros/vida/" },
    { name: "Gastos Médicos", href: "https://livestar.mx/seguros/gastos-medicos/" },
    { name: "Vehículos", href: "https://livestar.mx/seguros/vehiculos/" },
    { name: "Empresas", href: "https://livestar.mx/seguros/empresas/" },
    { name: "Hogar", href: "https://livestar.mx/seguros/hogar/" },
  ],
  cotizadores: [
    { name: "EMMA Ahorro", href: "https://livestar.mx/emma/ahorro.php" },
    { name: "Seguro de Vida", href: "https://livestar.com.mx/seguro/segurodevida.php" },
  ],
  general: [
    { name: "Nosotros", href: "https://livestar.mx/nosotros/" },
    { name: "Contacto", href: "https://livestar.mx/contacto/" },
    { name: "En confianza", href: "https://livestar.mx/en-confianza/" },
    { name: "Aviso de Privacidad", href: "/aviso-de-Privacidad" },
  ],
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/SegurosLivestar",
    icon: FacebookIcon,
    hoverColor: "hover:fill-[#1877f2]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/livestarmexico",
    icon: InstagramIcon,
    hoverColor: "hover:fill-[#E4405F]",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCu3y9eH65ysFaiiyw7Ws3AA",
    icon: YouTubeIcon,
    hoverColor: "hover:fill-[#FF0000]",
  },
  { name: "WhatsApp", href: "https://wa.me/+523318100575", icon: WhatsAppIcon, hoverColor: "hover:fill-[#25D366]" },
]

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm md:text-base text-gray-600 hover:text-[#223E99] transition-colors duration-200">
    {children}
  </Link>
)

const FooterLinkGroup = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="space-y-4">
    <h4 className="text-base font-semibold text-gray-800">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <FooterLink href={link.href}>{link.name}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
)

export function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-8 sm:py-10 md:py-12 border-t border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Logo y Redes Sociales */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <Image
                src={Logo || "/placeholder.svg"}
                width={180}
                height={60}
                alt="Livestar Seguros"
                className="h-auto w-32 sm:w-40 md:w-44 lg:w-48"
                priority
              />
            </Link>
            <p className="text-sm text-gray-500 mb-4 sm:mb-6 max-w-xs">
              Seguros y Ahorros entre personas. Protegemos lo que más quieres con soluciones a tu medida.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="transition-transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className={`w-6 h-6 fill-gray-400 transition-colors ${social.hoverColor}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <FooterLinkGroup title="Seguros" links={quickLinks.seguros} />
          </div>
          <div>
            <FooterLinkGroup title="Cotizadores" links={quickLinks.cotizadores} />
          </div>
          <div>
            <FooterLinkGroup title="General" links={quickLinks.general} />
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="text-center md:text-left space-y-1">
              <p>Plaza Concentro, Av Vallarta Pte. No. 6503, Local B5-5A</p>
              <p>Ciudad Granja, 45010, Zapopan, Jal, México</p>
              <p>
                <a href="mailto:contacto@livestar.mx" className="hover:text-[#223E99] transition-colors">contacto@livestar.mx</a>
                {" | "}
                <a href="tel:3331101122" className="hover:text-[#223E99] transition-colors">(33) 3110 1122</a>
              </p>
            </div>
            <div className="text-center md:text-right">
              <p>© {new Date().getFullYear()} Livestar. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
