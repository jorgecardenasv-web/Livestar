import { ContactIcon, HomeIcon } from "lucide-react";

export interface NavLiks {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

export const navLinks: NavLiks[] = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon, roles: ['ADMIN', 'ADVISOR'] },
  { name: 'Asesores', href: '/asesores', icon: ContactIcon, roles: ['ADMIN'] },
];