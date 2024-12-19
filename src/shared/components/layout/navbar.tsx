// import Image from "next/image";
// import Link from "next/link";
// import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//  } from "@radix-ui/react-dropdown-menu";

//  export const Navbar = () => {
//   return (
//     <>
//       <div className="hidden justify-between md:flex items-center text-white">
//         <Link href="/">
//           <Image src={Logo} alt="Logo Principal" width={238} height={68} />
//         </Link>
//         <nav className="flex gap-x-10 items-center font-bold">
//           <Link
//             href="#"
//             className="px-5 py-2 bg-white text-[#008AED] rounded hover:bg-[#0077CC] hover:text-white transition duration-300"
//           >
//             Cotizadores
//           </Link>
//           <Link
//             href="#"
//             className="hover:text-[#00BFFF] transition duration-300"
//           >
//             Seguros
//           </Link>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="font-bold hover:text-[#00BFFF] transition duration-300">
//                 Nosotros
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               className="mt-2 bg-white text-[#001F3F] shadow-lg rounded-lg py-2 w-48"
//               align="start"
//             >
//               <DropdownMenuItem asChild>
//                 <Link
//                   href="/about/team"
//                   className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
//                 >
//                   Nuestro Equipo
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link
//                   href="/about/history"
//                   className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
//                 >
//                   Historia
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link
//                   href="/about/values"
//                   className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
//                 >
//                   Valores
//                 </Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <Link
//             href="#"
//             className="hover:text-[#00BFFF] transition duration-300"
//           >
//             Contacto
//           </Link>
//           <Link
//             href="#"
//             className="hover:text-[#00BFFF] transition duration-300"
//           >
//             En confianza
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// };

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/shared/livestar_logo_horizontal_blanco.svg";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { CaretDownIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  return (
    <div className="hidden justify-between md:flex items-center text-white">
      <Link href="/">
        <Image src={Logo} alt="Logo Principal" width={238} height={68} />
      </Link>
      <NavigationMenu.Root>
        <NavigationMenu.List className="flex gap-x-10 items-center font-bold">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="px-5 py-2 bg-white text-[#008AED] rounded hover:bg-[#0077CC] hover:text-white transition duration-300">
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
            <NavigationMenu.Content className="mt-2 absolute bg-white text-[#001F3F] shadow-lg rounded-lg py-2 w-48 z-10">
              <ul className="list-none p-0">
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/team">Vida</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/history">Gastos Médicos</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/values">Vehículos</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/values">Empresas</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/values">Hogar</Link>
                  </NavigationMenu.Link>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          {/* "Nosotros" dropdown menu */}
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="group select-none items-center font-bold flex hover:text-[#00BFFF] transition duration-300">
              Nosotros
              <CaretDownIcon
							className="relative top-px text-violet10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
							aria-hidden
						/>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="mt-2 absolute bg-white text-[#001F3F] shadow-lg rounded-lg py-2 w-48 z-10">
              <ul className="list-none p-0">
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/team">Nuestro Equipo</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/history">Historia</Link>
                  </NavigationMenu.Link>
                </li>
                <li>
                  <NavigationMenu.Link
                    asChild
                    className="block px-4 py-2 hover:bg-[#00BFFF] hover:text-white transition duration-300 rounded"
                  >
                    <Link href="/about/values">Valores</Link>
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
              <Link href="#">Contacto</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link
              asChild
              className="hover:text-[#00BFFF] transition duration-300"
            >
              <Link href="#">En confianza</Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
};
