import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Car, HeartPulse, Hospital, Hotel, House } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="hidden justify-between md:flex items-center text-white">
      <Link href="/">
        <Image src={Logo} alt="Logo Principal" width={238} height={68} />
      </Link>
      <NavigationMenu.Root>
        <NavigationMenu.List className="flex gap-x-10 items-center font-bold">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="px-5 py-2 bg-white text-[#223E99] rounded hover:bg-[#223E99] hover:text-white transition duration-300">
              Cotizadores
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group select-none items-center font-bold flex hover:text-[#00BFFF] transition duration-300">
              Seguros
              <CaretDownIcon
							className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
							aria-hidden
						/>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="mt-2 absolute bg-white text-[#223E99] shadow-lg rounded-lg py-2 w-48 z-10">
              <ul className="list-none p-0">
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link className="flex" href="https://livestar.mx/seguros/vida/"><HeartPulse className="mr-2"/>Vida</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link className="flex" href="https://livestar.mx/seguros/gastos-medicos/"><Hospital className="mr-2"/>Gastos Médicos</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link className="flex" href="https://livestar.mx/seguros/vehiculos/"><Car className="mr-2"/>Vehículos</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link className="flex" href="https://livestar.mx/seguros/empresas/"><Hotel className="mr-2"/>Empresas</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link className="flex" href="https://livestar.mx/seguros/hogar/"><House className="mr-2"/>Hogar</Link>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              asChild
              className="hover:text-[#00BFFF] transition duration-300"
            >
              <Link href="#https://livestar.mx/nosotros/">Nosotros</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              asChild
              className="hover:text-[#00BFFF] transition duration-300"
            >
              <Link href="https://livestar.mx/contacto/">Contacto</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              asChild
              className="hover:text-[#00BFFF] transition duration-300"
            >
              <Link href="https://livestar.mx/en-confianza/">En confianza</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
};
