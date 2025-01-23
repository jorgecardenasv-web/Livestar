import { prefix } from "@/shared/utils/constants";
import {
  Contact,
  LayoutDashboard,
  Key,
  Users,
  NotepadText,
  BriefcaseMedical,
  Tag,
} from "lucide-react";

export interface NavLiks {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

export const navLinks: NavLiks[] = [
  {
    name: "Asesores",
    href: `${prefix}/asesores`,
    icon: Contact,
    roles: ["ADMIN"],
  },
  {
    name: "Prospectos",
    href: `${prefix}/prospectos`,
    icon: Users,
    roles: ["ADMIN", "ADVISOR"],
  },
  {
    name: "Aseguradoras",
    href: `${prefix}/aseguradoras`,
    icon: BriefcaseMedical,
    roles: ["ADMIN"],
  },
  {
    name: "Planes",
    href: `${prefix}/planes`,
    icon: NotepadText,
    roles: ["ADMIN"],
  },
  {
    name: "Tipo de planes",
    href: `${prefix}/planes/tipo-de-planes`,
    icon: Tag,
    roles: ["ADMIN"],
  },
  {
    name: "Sesiones",
    href: `${prefix}/sesiones`,
    icon: Key,
    roles: ["ADMIN"],
  },
];
