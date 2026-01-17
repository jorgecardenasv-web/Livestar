# Changelog

## Rama `feat/next16-upgrade-and-cleanup`

### Resumen
- Actualización del proyecto a Next.js 16 y actualización de dependencias.
- Rediseño completo del flujo de cotización y de la capa de UI principal.
- Migración de formularios a React Hook Form con validaciones Zod mejoradas.
- Limpieza de features antiguas (storytelling) y optimización de tipos, helpers y normalización de datos.
- Preparación del proyecto para despliegue con Docker y ajustes de configuración/env.

### Nuevas funcionalidades
- Implementado nuevo flujo de cotización multi‑paso con UI mejorada para el formulario principal de cotización.
- Añadido estado de verificación a los prospectos y mejoras en el formulario médico.
- Migración del manejo de formularios de cotización a React Hook Form, incluyendo nuevos hooks dedicados y helpers específicos.
- Incorporado soporte para envío de correos configurando la variable `EMAIL_FROM` y utilizándola en el remitente.
- Mejorado el layout general: nuevo diseño del header, footer y navegación, con componentes reorganizados.
- Añadidas mejoras de accesibilidad en la UI y refinamiento de los componentes de card.

### Refactors y mejoras técnicas
- Consolidado el flujo de cotización en una sola página, simplificando la navegación interna.
- Extraídos helpers de formularios y reorganizados los hooks relacionados con el quote form para una estructura más modular.
- Mejora de la seguridad de tipos en formularios médicos y payloads asociados.
- Actualización y refactor de esquemas Zod para un manejo de errores más claro y robusto.
- Normalización de datos de formularios con valores por defecto para evitar estados inconsistentes.
- Mejora de la estructura de componentes y del diseño responsive en distintas vistas.
- Ajustes en la inicialización del formulario de edición de cotizaciones para manejar correctamente el estado inicial.

### Correcciones de errores
- Corrección del manejo de campos `additionalInfo` anidados y de historiales médicos en las cotizaciones.
- Manejo más seguro de errores Zod, con mensajes de fallback para evitar fallos inesperados en runtime.
- Solucionados problemas de inicialización del formulario de edición de cotización al cargar datos existentes.

### Eliminaciones y limpieza
- Eliminada por completo la funcionalidad de storytelling y sus componentes, hooks y skeletons asociados.
- Eliminados componentes y hooks en desuso (por ejemplo, menú burger legacy y hooks móviles específicos) en favor de la nueva navegación/layout.
- Limpieza de configuraciones antiguas (incluyendo entradas de `tailwind.config.ts` y ajustes de `tsconfig.json`/`vercel.json` que ya no aplican al nuevo setup).

### Configuración, build y despliegue
- Actualización del proyecto a Next.js 16 con limpieza de código Prisma y compartido acorde a la nueva versión.
- Actualizadas dependencias a versiones recientes para alinearse con Next 16 y el stack actual.
- Configurado el proyecto para despliegue con Docker, incluyendo nuevos archivos de configuración y ajustes en variables de entorno.
- Actualización de `.dockerignore` y otros archivos relacionados con el entorno de ejecución.
- Ajustes en la configuración de Prisma (incluyendo paths de seeds) y de otros servicios compartidos.
- Ajustes en el proxy/middleware para alinearlo con los requisitos de Next 16.

### Estilo y documentación
- Añadido variant "dark" en estilos y ajustes relacionados con la temática visual.
- Actualizado el README con una descripción más detallada de la estructura del proyecto y del proceso de setup.
