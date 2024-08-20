# Livestar Insurance
## Descripción de como ejecutar el proyecto y sus comandos

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
- **`seed`** Ejecuta el linter de Next.js para analizar el código en busca de errores y advertencias de estilo, asegurando la consistencia y calidad del código.
- **`seed`**  Ejecuta un script (scripts/seed.ts) para poblar la base de datos con datos iniciales.
- **`prisma:generate`**  Genera el cliente de Prisma a partir del esquema de la base de datos definido en prisma/schema.prisma. Este comando es necesario para sincronizar el código con cualquier cambio en el esquema.
- **`prisma:migrate`**  Ejecuta migraciones de base de datos usando Prisma a través de un script (scripts/prisma-migrate.ts), permitiendo aplicar cambios estructurales en la base de datos.
- **`prisma:push:dev`**  Sincroniza el esquema Prisma con la base de datos en el entorno de desarrollo (development) sin crear migraciones.
- **`prisma:push:test`**  Similar a **`prisma:push:dev`** , pero aplica los cambios en la base de datos en el entorno de pruebas (test).
- **`prisma:reset`**  Restablece la base de datos al estado inicial, eliminando todos los datos y aplicando de nuevo el esquema Prisma.
- **`db:up:dev`**  Levanta la base de datos en el entorno de desarrollo, ejecutando cualquier configuración necesaria.
- **`db:down:dev`**  Apaga la base de datos en el entorno de desarrollo, deteniendo contenedores o servicios.
- **`db:up:test`**  Levanta la base de datos en el entorno de pruebas.
- **`db:down:test`**  Apaga la base de datos en el entorno de pruebas.
- **`test:e2e:dev`**  Ejecuta pruebas de extremo a extremo en el entorno de desarrollo. Levanta la base de datos de prueba, sincroniza el esquema, genera el cliente Prisma, ejecuta las pruebas y luego apaga la base de datos.
- **`test:e2e:run`**  Ejecuta pruebas de extremo a extremo usando Playwright en el entorno de prueba, cargando variables de entorno desde un archivo `.env.test`.
- **`dev:with-db`**  Ejecuta el entorno de desarrollo con la base de datos levantada. Este comando levanta la base de datos, sincroniza el esquema y luego inicia el servidor de desarrollo.

## Ejecutar por primera vez
Ejecuta los siguientes comandos en orden en la raíz del proyecto:
1. **`db:up:dev`**
2. **`prisma:push:dev`**
3. **`prisma:generate`**
4. **`dev`**

### Ya inicializado y configurado el proyecto
1. **`dev`**