# Livestar Insurance

Sistema de cotización de seguros desarrollado con tecnologías modernas.

## 🚀 Características principales

- Gestión de cotizaciones de seguros
- Panel de administración
- Simulador de costos
- Comparador de coberturas
- Gestión de asesores
- Seguimiento de prospectos
- Interfaz moderna y responsiva
- Generación de propuestas en PDF
- Gestión de usuarios y roles

## 🛠️ Tecnologías utilizadas

- **[Next.js](https://nextjs.org/)**
- **[Prisma](https://www.prisma.io/)**
- **[Docker](https://www.docker.com/)**
- **[TailwindCSS](https://tailwindcss.com/)**
- **[Shadcn/ui](https://ui.shadcn.com/)**
- **[Iron-Session](https://github.com/vvo/iron-session)**
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[Zod](https://zod.dev/)**
- **[Lucide Icons](https://lucide.dev/guide/packages/lucide-react)**
- **[React](https://react.dev)**
- **[Typescript](https://www.typescriptlang.org)**

## ⚙️ Requisitos previos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:

- **[Node.js](https://nodejs.org/en/) Versión mínima 18 o superior**
- **[PNPM](https://pnpm.io/es/) Versión 9 o superior**
- **[Docker](https://www.docker.com/) Versión 4 o superior**

## 🔧 Configuración inicial

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/livestar_insurance.git
cd livestar_insurance
```

2. Instala las dependencias

```bash
pnpm install
```

3. Copia el archivo de variables de entorno

```bash
cp .env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/livestar_insurance"
SESSION_SECRET="tu-secreto-seguro"
EMAIL_USER="tu-email@dominio.com"
EMAIL_PASSWORD="tu-contraseña"
EMAIL_HOST="tu-host-smtp"
EMAIL_PORT="puerto-smtp"
```

> [!IMPORTANT]
> Si es la primera vez que ejecutas el proyecto, debes ir a la sección de ejecutar por primera vez.

## 📦 Estructura del proyecto

```
livestar_insurance/
├── public/             # Archivos estáticos (imágenes, fuentes, etc.)
├── src/                # Código fuente principal
│   ├── app/            # Componentes y páginas de la interfaz
│   ├── features/       # Funcionalidades principales del sistema
│   │   ├── auth/       # Autenticación y autorización
│   │   ├── quotes/     # Gestión de cotizaciones
│   │   ├── advisors/   # Gestión de asesores
│   │   └── insurances/ # Generación de aseguradoras
│   ├── lib/            # Utilidades y funciones auxiliares
│   └── shared/         # Recursos compartidos (componentes, hooks, etc.)
├── prisma/             # Esquema y migraciones de base de datos
└── middleware.ts       # Configuración de middlewares
```

> [!NOTE]
> Esta estructura sigue los principios de **Screaming Architecture**, donde la organización del código refleja claramente el propósito del sistema. Para más detalles sobre la arquitectura, consulta [STRUCTURE.md](STRUCTURE.md).

## 🚀 Comandos disponibles

> [!NOTE]
> Para ejecutar los comandos, asegúrate de tener instalado el paquete pnpm, y poner `pnpm run comando-a-ejecutar`

- **`dev`** Inicia el servidor de desarrollo de Next.js. Este comando configura la variable de entorno NODE_ENV en development, lo que permite funcionar en modo desarrollo.
- **`build`** Compila la aplicación para producción. Establece NODE_ENV en production.
- **`start`** Inicia el servidor Next.js en modo producción. Utiliza los archivos generados por el comando build y sirve la aplicación de manera optimizada para producción.
- **`lint`** Ejecuta el linter de Next.js para analizar el código en busca de errores y advertencias de estilo, asegurando la consistencia y calidad del código.

## 🏃‍♂️ Primera ejecución

Ejecuta los siguientes comandos en orden en la raíz del proyecto:

### **Docker**

```bash
docker compose up -d
```

Conexión al contenedor para crear la base de datos en dado caso que no se cree sola

```bash
docker exec -it <nombre_del_contenedor> sh

psql -h localhost -p 5432 -U postgres -d postgres

CREATE DATABASE livestar_insurance;
```

### **Prisma**
```bash
pnpm prisma db push
```

```bash
pnpm prisma generate
```

```bash
pnpm install
pnpm run dev
```

### **O directamente**

```bash
pnpm run build
```
