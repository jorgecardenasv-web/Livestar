"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { HeartPulse, Hospital, Car, Hotel, House } from "lucide-react"; // Ajusta los íconos según tu librería

export const DrawerMenu = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center py-4">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={Logo}
                alt="Logo Principal"
                width={200}
                height={58}
                className="w-auto "
              />
            </Link>
          </div>
        </SidebarHeader>

        {/* Contenido del Sidebar */}
        <SidebarContent>
          <SidebarGroup>
            <ul className="flex flex-col space-y-4 text-base font-bold text-[#223E99]">
              <li>
                <Link
                  href="/cotizadores"
                  className="block px-4 py-2 bg-white rounded hover:bg-[#223E99] hover:text-white transition duration-300"
                >
                  Cotizadores
                </Link>
              </li>
              <li>
                <div className="relative group">
                  <button className="flex justify-items-center w-full px-4 py-4 text-left bg-white rounded hover:bg-[#223E99] hover:text-white transition duration-300">
                    Seguros
                    <CaretDownIcon className="inline-block ml-2" />
                  </button>
                  <ul className="hidden group-hover:block mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                    <li>
                      <Link
                        href="https://livestar.mx/seguros/vida/"
                        className="flex items-center px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300"
                      >
                        <HeartPulse className="mr-2" />
                        Vida
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://livestar.mx/seguros/gastos-medicos/"
                        className="flex items-center px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300"
                      >
                        <Hospital className="mr-2" />
                        Gastos Médicos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://livestar.mx/seguros/vehiculos/"
                        className="flex items-center px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300"
                      >
                        <Car className="mr-2" />
                        Vehículos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://livestar.mx/seguros/empresas/"
                        className="flex items-center px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300"
                      >
                        <Hotel className="mr-2" />
                        Empresas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://livestar.mx/seguros/hogar/"
                        className="flex items-center px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300"
                      >
                        <House className="mr-2" />
                        Hogar
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  href="https://livestar.mx/nosotros/"
                  className="block px-4 py-2 bg-white rounded hover:bg-[#223E99] hover:text-white transition duration-300"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="https://livestar.mx/contacto/"
                  className="block px-4 py-2 bg-white rounded hover:bg-[#223E99] hover:text-white transition duration-300"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="https://livestar.mx/en-confianza/"
                  className="block px-4 py-2 bg-white rounded hover:bg-[#223E99] hover:text-white transition duration-300"
                >
                  En Confianza
                </Link>
              </li>
            </ul>
          </SidebarGroup>
        </SidebarContent>

        {/* Pie del Sidebar */}
        <SidebarFooter>
          <div className="text-center py-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Livestar
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Contenido principal */}
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
};
