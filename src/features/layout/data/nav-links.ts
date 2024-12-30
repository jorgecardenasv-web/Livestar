import { prefix } from "@/shared/utils/constants";
import {
  ContactIcon,
  LayoutDashboardIcon,
  KeyIcon,
  UsersIcon,
  NotepadTextIcon,
  BriefcaseMedicalIcon,
} from "lucide-react";

export interface NavLiks {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

export const navLinks: NavLiks[] = [
  {
    name: "Panel",
    href: `${prefix}/panel`,
    icon: LayoutDashboardIcon,
    roles: ["ADMIN", "ADVISOR"],
  },
  {
    name: "Asesores",
    href: `${prefix}/asesores`,
    icon: ContactIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Prospectos",
    href: `${prefix}/prospectos`,
    icon: UsersIcon,
    roles: ["ADMIN", "ADVISOR"],
  },
  {
    name: "Aseguradoras",
    href: `${prefix}/aseguradoras`,
    icon: BriefcaseMedicalIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Planes",
    href: `${prefix}/planes`,
    icon: NotepadTextIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Sesiones",
    href: `${prefix}/sesiones`,
    icon: KeyIcon,
    roles: ["ADMIN"],
  },
];
