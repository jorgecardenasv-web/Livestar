"use client";

import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Link from "next/link";
import { navLinks } from "@/features/layout/data/nav-links";
import NavLinks from "@/features/layout/components/nav-link";
import { ThemeSelector } from "@/features/theming/components/theme-selector";
import { Dropdown } from "@/features/layout/components/dropdown";
import { prefix } from "@/shared/utils/constants";

export const HamburgerMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="md:hidden p-4">
          <Menu className="h-8 w-8" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Link
              className="mb-2 flex h-20 items-end justify-start rounded bg-primary p-4 md:h-40"
              href={`${prefix}/panel`}
            >
              <div className="w-32 text-white md:w-40">
                <h2 className="text-3xl font-bold">Livestar</h2>
              </div>
            </Link>
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 w-full">
            <NavLinks userRole={"ADMIN"} />
            {/* <div className="flex flex-row items-center space-x-2">
              <ThemeSelector />
              <div className="md:hidden">
                <Dropdown />
              </div>
            </div> */}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
