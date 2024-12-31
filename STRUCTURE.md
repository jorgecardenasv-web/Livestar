# Livestar Insurance
## Estructura y arquitectura 

## Arquitectura:
En este proyecto, seguimos los principios de **Screaming Architecture**, un enfoque que busca que la estructura del sistema refleje claramente su propósito

### Principios Clave
- Diseño Centrado en el Dominio
- Separación Clara de Responsabilidades
- Independencia de Frameworks

### Beneficios
- **Claridad:** La estructura del proyecto deja claro su propósito principal.
- **Mantenibilidad:** La separación de responsabilidades facilita el mantenimiento y la extensión del sistema.
- **Flexibilidad:** La arquitectura permite cambios tecnológicos sin afectar la lógica de negocio.

## Estructura de carpetas
- **`public/`**: Contiene archivos estáticos accesibles públicamente como imágenes, fuentes, etc. Los archivos aquí se sirven directamente a través de la URL base del sitio. 
- **`src/`**: Carpeta principal que organiza el código fuente del proyecto.
    - **`app/`**: Esta carpeta contiene los componentes y las páginas que forman la interfaz de usuario de la aplicación. Se puede dividir en subcarpetas según las rutas y secciones principales de la aplicación.
    - **`features`/**: Aquí se organizan las funcionalidades principales del sistema. Cada funcionalidad se representa como un módulo o una característica (feature), que puede contener sus propios componentes, hooks, servicios y lógica.
  - **`lib/`**: Incluye utilidades, funciones auxiliares, y otras librerías que son reutilizables a lo largo del proyecto. 
  - **`shared/`**: Contiene recursos compartidos entre diferentes partes del proyecto, como componentes comunes, constantes, hooks reutilizables, y más.
  - **`middleware.ts`**: Archivo que contiene la configuración y lógica de los middlewares, útiles para el manejo de solicitudes y respuestas en el servidor.

- **`.env`: Archivo de configuración de variables de entorno.
