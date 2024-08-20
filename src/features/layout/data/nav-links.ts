import { ContactIcon, HomeIcon } from "lucide-react";

export const navLinks = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon, roles: ['ADMIN', 'ADVISOR'] },
  { name: 'Asesores', href: '/asesores', icon: ContactIcon, roles: ['ADMIN'] },
];