import { Role } from "@prisma/client";

export const prefix = "/ctl";

export const publicPaths = [
  "/",
  "/cotizar",
  "/cotizar/planes",
  "/cotizar/resumen",
  "/cotizar/flow",
  "/finalizar-cotizacion",
  "/aviso-de-Privacidad",
];

export const authPaths = ["/iniciar-sesion"];

export const defaultRoutes = {
  [Role.ADMIN]: `${prefix}/cotizaciones`,
  [Role.ASESOR]: `${prefix}/cotizaciones`,
} as const;

export const restrictedPaths = {
  [Role.ADMIN]: publicPaths,
  [Role.ASESOR]: publicPaths,
} as const;

export const quoteRoutes = {
  flow: "/cotizar/flow",
  planes: "/cotizar/planes",
  resumen: "/cotizar/resumen",
  root: "/cotizar",
} as const;
