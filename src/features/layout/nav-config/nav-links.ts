import { prefix } from "@/features/layout/nav-config/constants";
import { Role } from "@generated/prisma/enums";
import {
  Contact,
  Key,
  Users,
  NotepadText,
  BriefcaseMedical,
  Tag,
} from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
  visible?: boolean;
  children?: {
    path: string;
    roles: string[];
  }[];
}

export const navLinks: NavLink[] = [
  {
    name: "Asesores",
    href: `${prefix}/asesores`,
    icon: Contact,
    roles: [Role.ADMIN],
    visible: true,
  },
  {
    name: "Cotizaciones",
    href: `${prefix}/cotizaciones`,
    icon: Users,
    roles: [Role.ADMIN, Role.ASESOR],
    visible: true,
    children: [{ path: "/:id", roles: [Role.ADMIN, Role.ASESOR] }],
  },
  {
    name: "Aseguradoras",
    href: `${prefix}/aseguradoras`,
    icon: BriefcaseMedical,
    roles: [Role.ADMIN],
  },
  {
    name: "Planes",
    href: `${prefix}/planes`,
    icon: NotepadText,
    roles: [Role.ADMIN],
    children: [{ path: "/:id", roles: [Role.ADMIN] }],
  },
  {
    name: "Tipo de planes",
    href: `${prefix}/planes/tipo-de-planes`,
    icon: Tag,
    roles: [Role.ADMIN],
  },
  {
    name: "Sesiones",
    href: `${prefix}/sesiones`,
    icon: Key,
    roles: [Role.ADMIN],
  },
];

export const getRoutesByRoles = () => {
  const routeRoles: { [key: string]: string[] } = {};

  navLinks.forEach((link) => {
    const normalizedHref = link.href.replace(/\/+/g, "/").replace(/\/$/, "");
    routeRoles[normalizedHref] = link.roles;

    link.children?.forEach((child) => {
      const fullPath = `${normalizedHref}${child.path}`;
      const normalizedPath = fullPath.replace(/\/+/g, "/").replace(/\/$/, "");
      routeRoles[normalizedPath] = child.roles;
    });
  });

  return routeRoles;
};

export const matchRoute = (pattern: string, path: string): boolean => {
  const cleanPattern = pattern.split("?")[0];
  const cleanPath = path.split("?")[0];

  const normalizedPattern = cleanPattern
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
  const normalizedPath = cleanPath.replace(/\/+/g, "/").replace(/\/$/, "");

  const patternParts = normalizedPattern.split("/").filter(Boolean);
  const pathParts = normalizedPath.split("/").filter(Boolean);

  if (patternParts.length !== pathParts.length) return false;

  return patternParts.every((part, i) => {
    if (part.startsWith(":")) return true;
    return part === pathParts[i];
  });
};
