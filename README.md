# Livestar Insurance

Sistema de cotización de seguros moderno y escalable, diseñado para optimizar la gestión de pólizas, asesores y prospectos.

## 🚀 Descripción General

Livestar Insurance es una plataforma integral que permite:
- **Cotización en tiempo real**: Cálculo de primas y comparación de coberturas.
- **Gestión de Planes**: Administración dinámica de aseguradoras, tipos de planes y tablas de precios.
- **Panel de Asesores**: Herramientas para que los asesores gestionen sus prospectos.
- **Generación de Propuestas**: Creación automatizada de PDFs profesionales para clientes.
- **Administración**: Control total sobre usuarios, roles y configuraciones del sistema.

## 🛠️ Stack Tecnológico

El proyecto utiliza tecnologías de vanguardia para garantizar rendimiento, seguridad y mantenibilidad:

### Core & Frontend
- **[Next.js 16](https://nextjs.org/)**: Framework de React para producción (App Router).
- **[React 19](https://react.dev)**: Biblioteca para interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org)**: Tipado estático robusto.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Motor de estilos utility-first.
- **[Shadcn/ui](https://ui.shadcn.com/)**: Componentes de UI reutilizables y accesibles.
- **[Framer Motion](https://www.framer.com/motion/)**: Animaciones fluidas.
- **[Lucide Icons](https://lucide.dev)**: Iconografía consistente.

### Estado & Datos
- **[Prisma](https://www.prisma.io/)**: ORM de última generación para Node.js y TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)**: Base de datos relacional robusta.
- **[Zustand](https://github.com/pmndrs/zustand)**: Gestión de estado global ligero y escalable.
- **[Iron-Session](https://github.com/vvo/iron-session)**: Gestión de sesiones encriptadas y seguras.

### Formularios & Validación
- **[React Hook Form](https://react-hook-form.com/)**: Manejo eficiente de formularios.
- **[Zod](https://zod.dev/)**: Validación de esquemas y tipos TypeScript.

### Herramientas Especializadas
- **Documentos**: `puppeteer`, `jspdf`, `pdf-lib` (Generación y manipulación de PDFs).
- **Hojas de Cálculo**: `exceljs`, `xlsx` (Procesamiento de Excel).
- **Email**: `nodemailer` (Envío de correos transaccionales).
- **Editor de Texto**: `tiptap` (Editor WYSIWYG headless).

### Infraestructura
- **[Docker](https://www.docker.com/)**: Contenerización de la aplicación y base de datos.
- **[PNPM](https://pnpm.io/)**: Gestor de paquetes rápido y eficiente.

## 🏗️ Arquitectura y Estructura

Este proyecto sigue los principios de **Screaming Architecture**. La estructura del código "grita" su propósito y dominio de negocio, no solo las herramientas técnicas.

### Principios Clave
1.  **Modularidad por Features**: El código se organiza por características funcionales (`features/`) en lugar de por tipo de archivo (no agrupamos todos los controladores o componentes juntos, sino por dominio).
2.  **Separación de Responsabilidades**: UI, lógica de negocio y acceso a datos están claramente delimitados.
3.  **Co-locación**: Todo lo relacionado con una funcionalidad (componentes, hooks, servicios, acciones) vive junto.

### Estructura de Carpetas

```
livestar_insurance/
├── public/                 # Assets estáticos públicos
├── prisma/                 # Esquema de BD y scripts de seed
├── src/
│   ├── app/                # Rutas y páginas (Next.js App Router)
│   │     ├── (auth)/       # Rutas de autenticación
│   │     ├── (cliente)/    # Rutas públicas/cliente final
│   │     ├── ctl/          # Panel de control / Dashboard interno
│   │     └── api/          # Endpoints de API
│   │
│   ├── features/           # Módulos principales del dominio
│   │     ├── advisors/     # Lógica de asesores (CRUD, métricas)
│   │     ├── auth/         # Lógica de autenticación (Login, Verify)
│   │     ├── home/         # Landing page y componentes de inicio
│   │     ├── insurance/    # Gestión de compañías aseguradoras
│   │     ├── plans/        # Lógica de planes, precios y cotización
│   │     ├── notification/ # Sistema de notificaciones
│   │     └── layout/       # Componentes estructurales (Sidebar, Header)
│   │
│   ├── lib/                # Utilidades generales y configuración de librerías
│   ├── shared/             # Componentes y hooks reutilizables entre features
│   └── assets/             # Imágenes y recursos importados desde código
└── ...config files
```

## ⚙️ Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- **[Node.js](https://nodejs.org/)**: Versión **24.0.0** o superior.
- **[PNPM](https://pnpm.io/)**: Versión 9 o superior (Recomendado).
- **[Docker](https://www.docker.com/)**: Para levantar la base de datos localmente.

## 🚀 Configuración Inicial

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/tu-usuario/livestar_insurance.git
    cd livestar_insurance
    ```

2.  **Instalar dependencias**
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno**
    Copia el archivo de ejemplo y ajústalo con tus credenciales:
    ```bash
    cp .env.example .env
    ```
    > Asegúrate de configurar correctamente `DATABASE_URL` y las credenciales de correo.

4.  **Iniciar infraestructura (Base de Datos)**
    Si usas Docker Compose:
    ```bash
    docker compose up -d
    ```

5.  **Inicializar Base de Datos**
    Ejecuta las migraciones y carga los datos de prueba (seeds):
    ```bash
    pnpm prisma:push
    pnpm prisma:generate
    pnpm db:seed
    ```

6.  **Iniciar servidor de desarrollo**
    ```bash
    pnpm dev
    ```
    Visita `http://localhost:3000`.

## 📜 Comandos Disponibles

- `pnpm dev`: Inicia entorno de desarrollo.
- `pnpm build`: Compila para producción.
- `pnpm start`: Inicia servidor de producción.
- `pnpm lint`: Verifica calidad de código.
- `pnpm db:seed`: Puebla la base de datos con información inicial.
