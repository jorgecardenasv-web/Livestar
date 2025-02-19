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
  <Link href={href} className="text-sm md:text-base text-gray-600 hover:text-black transition-colors duration-200">
    {children}
  </Link>
)

const FooterLinkGroup = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-700">{title}</h4>
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
    <footer className="bg-white text-gray-600 py-8 md:py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-y-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 w-full">
            <Image
              src={Logo || "/placeholder.svg"}
              width={180}
              height={110}
              alt="Logo empresa"
              className="mb-4"
              priority
            />
            <p className="text-sm mb-4">Seguros y Ahorros entre personas</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className={`fill-[#666666] ${social.hoverColor}`} />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4 lg:pl-8 w-full">
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
        </div>
        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs md:text-sm text-gray-500 mb-4 md:mb-0 text-center md:text-left">
              <p>Plaza Concentro, Av Vallarta Pte. No. 6503, Local B5-5A</p>
              <p>Ciudad Granja, 45010, Zapopan, Jal, México</p>
              <p>contacto@livestar.mx | (33) 3110 1122 | (33) 1810 1118</p>
            </div>
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              © {new Date().getFullYear()} Livestar. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

