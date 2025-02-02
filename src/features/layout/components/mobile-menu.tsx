import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import Link from "next/link";
import NavLinks from "@/features/layout/components/nav-link";
import { ThemeSelector } from "@/features/theming/components/theme-selector";
import { Dropdown } from "@/features/layout/components/dropdown";
import { prefix } from "@/features/layout/nav-config/constants";

export const MobileMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="md:hidden">
          <Menu size={30} />
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
          <NavLinks userRole={"ADMIN"} />
          <ThemeSelector />
          <Dropdown label="Usuario" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
