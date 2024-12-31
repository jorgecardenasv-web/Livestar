# Livestar Insurance
## Descripción de como ejecutar el proyecto y sus comandos

## Tecnologías utilizadas
- **[Next.js](https://nextjs.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[Docker](https://www.docker.com/)**
- **[Playwright](https://playwright.dev/)**
- **[TailwindCSS](https://tailwindcss.com/)**
- **[Tremor](https://tremor.rs/)**
- **[NextAuth.js](https://next-auth.js.org/)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Zod](https://zod.dev/)**
- **[Lucide Icons](https://lucide.dev/guide/packages/lucide-react)**
- **[React](https://react.dev)**
- **[Typescript](https://www.typescriptlang.org)**             

## Requisitos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:
- **[Node.js](https://nodejs.org/en/) Version minima 18 o superior**
- **[PNPM](https://pnpm.io/es/) Cualquier versión**
- **[Docker](https://www.docker.com/) Cualquier versión**

## Configuración
Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno. Crea un archivo .env en la raíz del proyecto y añade las variables 

> [!IMPORTANT]
> Si es la primera vez que ejecutas el proyecto, debes ir a la sección de ejecutar por primera vez.

## Comandos 
> [!NOTE]
> Para ejecutar los comandos, asegúrate de tener instalado el paquete pnpm, y poner `pnpm run comando-a-ejecutar`
- **`dev`** Inicia el servidor de desarrollo de Next.js. Este comando configura la variable de entorno NODE_ENV en development, lo que permite funcionar en modo desarrollo.
- **`build`** Compila la aplicación para producción. Establece NODE_ENV en production.
- **`start`** Inicia el servidor Next.js en modo producción. Utiliza los archivos generados por el comando build y sirve la aplicación de manera optimizada para producción.
- **`lint`** Ejecuta el linter de Next.js para analizar el código en busca de errores y advertencias de estilo, asegurando la consistencia y calidad del código.


## Ejecutar por primera vez
Ejecuta los siguientes comandos en orden en la raíz del proyecto:
1. **`db:up`**
2. **`prisma:push`**
3. **`prisma:generate`**
4. **`dev`**

### Ya inicializado y configurado el proyecto
1. **`dev`**