# Epic: Gestión de Usuarios y Accesos

## Descripción del Epic
Este Epic se centra en el desarrollo e implementación de un sistema robusto y seguro para la gestión de usuarios y accesos en nuestra plataforma de seguimiento de prospectos de seguros médicos. El objetivo principal es proporcionar mecanismos de autenticación y autorización eficaces tanto para administradores como para asesores, garantizando la seguridad de la información y facilitando una experiencia de usuario fluida.

## Objetivos
1. Implementar un sistema de autenticación seguro para administradores y asesores.
2. Desarrollar funcionalidades para la gestión eficiente de cuentas de usuario.
3. Asegurar la protección de datos sensibles y el cumplimiento de estándares de seguridad.
4. Mejorar la experiencia de usuario en lo relativo a la gestión de cuentas y accesos.

## Historias de Usuario Incluidas
1. Acceso de administrador
2. Cambio de contraseña
3. Gestión de asesores
4. Inicio de sesión de asesor

## Beneficios del Negocio
- [ ] Aumentar la seguridad de la plataforma, protegiendo la información sensible de los clientes y la empresa.
- [ ] Mejorar la eficiencia operativa al proporcionar a los usuarios las herramientas necesarias para gestionar sus propias cuentas.
- [ ] Facilitar la gestión y supervisión del equipo de ventas a través de un sistema centralizado de gestión de asesores.
- [ ] Reducir el riesgo de accesos no autorizados y potenciales brechas de seguridad.

## Consideraciones Técnicas
- [ ] Utilizar Next.js 14 con App Router para la implementación.
- [ ] Aprovechar los Server Components y Server Actions de Next.js para operaciones seguras del lado del servidor.
- [ ] Implementar TailwindCSS para un diseño consistente y responsivo.
- [ ] Configurar pruebas E2E con Playwright para asegurar la calidad y funcionalidad del sistema.

## Riesgos Potenciales
- [ ] La complejidad de la implementación de un sistema de autenticación seguro podría llevar más tiempo del esperado.
- [ ] La integración de diferentes niveles de acceso (administrador vs asesor) podría introducir errores si no se maneja cuidadosamente.
- [ ] Los cambios en la gestión de usuarios podrían requerir actualizaciones en otras partes del sistema.

## Criterios de Éxito
- [ ] Todos los usuarios pueden acceder de forma segura a sus respectivas áreas del sistema.
- [ ] Los administradores pueden gestionar eficazmente las cuentas de los asesores.
- [ ] El sistema cumple con los estándares de seguridad requeridos.
- [ ] Las pruebas E2E pasan con éxito para todos los flujos de autenticación y gestión de usuarios.

## Estimación de Tiempo
Tiempo total estimado para el Epic: 2 semanas

## Dependencias
- [ ] Configuración inicial del proyecto Next.js
- [ ] Diseño de la arquitectura de la base de datos para almacenar información de usuarios

---

## Historias de Usuario

---

### Historia 1: Acceso de Administrador

**Como** administrador del sistema,
**Quiero** poder acceder al dashboard mediante un proceso de inicio de sesión seguro,
**Para** gestionar las funcionalidades y datos del sistema de seguimiento de prospectos de seguros médicos.

**Tareas:**
1. Diseñar y desarrollar la página de inicio de sesión
2. Implementar la autenticación del lado del servidor utilizando NextAuth.js
3. Crear un middleware para proteger las rutas de administrador
4. Desarrollar el componente de cierre de sesión
5. Implementar la lógica de expiración de sesión

**Criterios de Aceptación:**
- [ ] Existe una página de inicio de sesión accesible desde la página principal
- [ ] El formulario de inicio de sesión contiene campos para correo electrónico y contraseña
- [ ] La validación del formulario se realiza tanto en el cliente como en el servidor
- [ ] Se muestra un mensaje de error claro si las credenciales son incorrectas
- [ ] Después de un inicio de sesión exitoso, el administrador es redirigido al dashboard principal
- [ ] Todas las rutas protegidas redirigen a la página de inicio de sesión si el usuario no está autenticado
- [ ] Existe un mecanismo de cierre de sesión funcional
- [ ] La sesión expira después de 30 minutos de inactividad

**Estimación:** 2 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 2: Cambio de Contraseña

**Como** administrador o asesor,
**Quiero** poder cambiar mi contraseña,
**Para** mantener la seguridad de mi cuenta.

**Tareas:**
1. Diseñar y desarrollar la página de cambio de contraseña
2. Implementar la lógica de validación de contraseña actual
3. Crear una Server Action para actualizar la contraseña en la base de datos
4. Implementar notificaciones de éxito o error

**Criterios de Aceptación:**
- [ ] Existe una página o modal de cambio de contraseña accesible desde el perfil del usuario
- [ ] El formulario requiere la contraseña actual, la nueva contraseña y la confirmación de la nueva contraseña
- [ ] Se valida que la nueva contraseña cumpla con los requisitos de seguridad (longitud mínima, caracteres especiales, etc.)
- [ ] Se muestra un mensaje de error si la contraseña actual es incorrecta
- [ ] Se muestra una notificación de éxito cuando la contraseña se cambia correctamente
- [ ] El usuario es redirigido a la página de inicio de sesión después de cambiar la contraseña

**Estimación:** 1 día
**Asignado a:** Desarrollador Junior

---

### Historia 3: Gestión de Asesores

**Como** administrador,
**Quiero** poder crear, modificar y desactivar cuentas de asesores,
**Para** gestionar eficientemente el equipo de ventas.

**Tareas:**
1. Desarrollar la interfaz de gestión de asesores
2. Implementar la funcionalidad de creación de nuevos asesores
3. Desarrollar la funcionalidad de edición de información de asesores
4. Implementar la funcionalidad de desactivación/activación de cuentas de asesores
5. Crear Server Actions para las operaciones CRUD de asesores

**Criterios de Aceptación:**
- [ ] Existe una página de gestión de asesores accesible solo para administradores
- [ ] Se puede crear un nuevo asesor proporcionando nombre, correo electrónico y contraseña inicial
- [ ] Se puede editar la información de un asesor existente (nombre, correo electrónico)
- [ ] Se puede desactivar o reactivar la cuenta de un asesor
- [ ] La lista de asesores muestra el estado actual de cada cuenta (activo/inactivo)
- [ ] Se implementa paginación para la lista de asesores si hay más de 10 asesores
- [ ] Todas las operaciones (crear, editar, desactivar) muestran notificaciones de éxito o error

**Estimación:** 3 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 4: Inicio de Sesión de Asesor

**Como** asesor,
**Quiero** poder iniciar sesión en la plataforma,
**Para** acceder a mis herramientas de seguimiento de prospectos.

**Tareas:**
1. Adaptar la página de inicio de sesión para incluir roles (administrador/asesor)
2. Implementar la lógica de autenticación específica para asesores
3. Crear un middleware para proteger las rutas de asesores
4. Desarrollar el dashboard inicial para asesores

**Criterios de Aceptación:**
- [ ] Los asesores pueden iniciar sesión utilizando su correo electrónico y contraseña
- [ ] Después de un inicio de sesión exitoso, el asesor es redirigido a su dashboard específico
- [ ] Se muestra un mensaje de error si las credenciales son incorrectas o si la cuenta está desactivada
- [ ] Las rutas protegidas de asesores redirigen a la página de inicio de sesión si el usuario no está autenticado
- [ ] El dashboard inicial del asesor muestra información relevante (resumen de prospectos, tareas pendientes, etc.)
- [ ] La sesión del asesor expira después de 30 minutos de inactividad

**Estimación:** 2 días
**Asignado a:** Desarrollador Junior, con supervisión del Desarrollador Semi Senior

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Epic: Gestión de Aseguradoras y Planes

## Descripción del Epic
Este Epic se enfoca en el desarrollo e implementación de un sistema completo para la gestión de aseguradoras y planes de seguros médicos en nuestra plataforma. El objetivo principal es proporcionar a los administradores las herramientas necesarias para crear, modificar y gestionar eficientemente la información relacionada con aseguradoras y sus planes, así como establecer relaciones entre ellos y permitir la personalización de planes.

## Objetivos
1. Implementar un sistema robusto para la gestión de aseguradoras.
2. Desarrollar funcionalidades para la creación y gestión de planes de seguros.
3. Establecer un mecanismo para relacionar planes con aseguradoras.
4. Permitir la personalización y configuración detallada de planes.
5. Proporcionar una interfaz intuitiva para la entrada y visualización de información detallada de los planes.

## Historias de Usuario Incluidas
1. Gestión de aseguradoras y planes
2. Alta de nuevos planes
3. Alta de nuevas aseguradoras
4. Relación entre planes y aseguradoras
5. Información detallada de planes
6. Personalización de planes

## Beneficios del Negocio
- [ ] Mejorar la eficiencia en la gestión de información de aseguradoras y planes.
- [ ] Facilitar la comparación y selección de planes para los asesores y clientes.
- [ ] Aumentar la flexibilidad en la oferta de planes personalizados.
- [ ] Proporcionar información clara y detallada sobre los beneficios de cada plan.
- [ ] Optimizar el proceso de actualización de información de planes y aseguradoras.

## Consideraciones Técnicas
- [ ] Utilizar Next.js 14 con App Router para la implementación.
- [ ] Aprovechar los Server Components y Server Actions de Next.js para operaciones del lado del servidor.
- [ ] Implementar TailwindCSS y Tremor para un diseño consistente y componentes de dashboard avanzados.
- [ ] Diseñar una estructura de base de datos flexible que permita relaciones complejas entre aseguradoras y planes.
- [ ] Implementar validaciones robustas para asegurar la integridad de los datos.

## Riesgos Potenciales
- [ ] La complejidad de las relaciones entre planes y aseguradoras podría llevar a desafíos en el diseño de la base de datos.
- [ ] La implementación de la personalización de planes podría resultar más compleja de lo previsto.
- [ ] La entrada de grandes cantidades de datos detallados podría ser propensa a errores si no se maneja adecuadamente.

## Criterios de Éxito
- [ ] Los administradores pueden gestionar eficazmente aseguradoras y planes a través de la interfaz.
- [ ] La información detallada de los planes se presenta de manera clara y comprensible.
- [ ] Los planes pueden ser personalizados según las necesidades específicas.
- [ ] Las relaciones entre planes y aseguradoras se establecen y mantienen correctamente.
- [ ] El sistema puede manejar un gran volumen de datos sin degradación del rendimiento.

## Estimación de Tiempo
Tiempo total estimado para el Epic: 3 semanas

## Dependencias
- [ ] Completación del Epic de Gestión de Usuarios y Accesos para asegurar que solo los administradores puedan acceder a estas funcionalidades.
- [ ] Diseño de la arquitectura de la base de datos para soportar las relaciones complejas entre aseguradoras y planes.

Este Epic es fundamental para proporcionar una base sólida de información sobre aseguradoras y planes, lo cual es esencial para el funcionamiento eficaz del sistema de seguimiento de prospectos de seguros médicos.

---

## Historias de Usuario

---

### Historia 1: Gestión de Aseguradoras y Planes

**Como** administrador del sistema,
**Quiero** tener una interfaz centralizada para gestionar aseguradoras y planes,
**Para** poder administrar eficientemente la información de los productos de seguros ofrecidos.

**Tareas:**
1. Diseñar y desarrollar una página de dashboard para la gestión de aseguradoras y planes
2. Implementar una vista de lista para aseguradoras con opciones de filtrado y búsqueda
3. Crear una vista de lista para planes con opciones de filtrado y búsqueda
4. Desarrollar formularios para la edición rápida de información básica de aseguradoras y planes
5. Implementar la lógica de paginación para manejar grandes cantidades de datos

**Criterios de Aceptación:**
- [ ] Existe una página de dashboard accesible solo para administradores que muestra tanto aseguradoras como planes
- [ ] Se puede buscar y filtrar aseguradoras y planes por nombre, tipo, u otros atributos relevantes
- [ ] La información básica de aseguradoras y planes se puede editar directamente desde la lista
- [ ] La interfaz es responsiva y funciona correctamente en dispositivos móviles y de escritorio
- [ ] Los cambios realizados se reflejan inmediatamente en la interfaz y se persisten en la base de datos

**Estimación:** 3 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 2: Alta de Nuevos Planes

**Como** administrador del sistema,
**Quiero** poder dar de alta nuevos planes de seguro,
**Para** expandir y actualizar la oferta de productos disponibles.

**Tareas:**
1. Diseñar y desarrollar un formulario para la creación de nuevos planes
2. Implementar validaciones de formulario tanto en el cliente como en el servidor
3. Crear una Server Action para procesar la creación de nuevos planes
4. Desarrollar la lógica para asociar el nuevo plan con una o más aseguradoras existentes
5. Implementar notificaciones de éxito o error tras la creación del plan

**Criterios de Aceptación:**
- [ ] Existe un formulario accesible para crear nuevos planes con campos para nombre, descripción, tipo de cobertura, y otros detalles relevantes
- [ ] Se valida que no se puedan crear planes duplicados (mismo nombre y aseguradora)
- [ ] El administrador puede asociar el nuevo plan con una o más aseguradoras existentes durante la creación
- [ ] Tras la creación exitosa, el nuevo plan aparece inmediatamente en la lista de planes
- [ ] Se muestra una notificación de éxito o error después de intentar crear un nuevo plan

**Estimación:** 2 días
**Asignado a:** Desarrollador Junior, con supervisión del Desarrollador Semi Senior

---

### Historia 3: Alta de Nuevas Aseguradoras

**Como** administrador del sistema,
**Quiero** poder dar de alta nuevas aseguradoras,
**Para** expandir la red de proveedores de seguros en la plataforma.

**Tareas:**
1. Diseñar y desarrollar un formulario para la creación de nuevas aseguradoras
2. Implementar validaciones de formulario tanto en el cliente como en el servidor
3. Crear una Server Action para procesar la creación de nuevas aseguradoras
4. Desarrollar la lógica para manejar la información de contacto y detalles legales de la aseguradora
5. Implementar un sistema para cargar y almacenar el logotipo de la aseguradora

**Criterios de Aceptación:**
- [ ] Existe un formulario accesible para crear nuevas aseguradoras con campos para nombre, información de contacto, detalles legales, etc.
- [ ] Se valida que no se puedan crear aseguradoras duplicadas (mismo nombre o información legal)
- [ ] El administrador puede cargar un logotipo para la nueva aseguradora
- [ ] Tras la creación exitosa, la nueva aseguradora aparece inmediatamente en la lista de aseguradoras
- [ ] Se muestra una notificación de éxito o error después de intentar crear una nueva aseguradora

**Estimación:** 2 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 4: Relación entre Planes y Aseguradoras

**Como** administrador del sistema,
**Quiero** poder establecer y gestionar relaciones entre planes y aseguradoras,
**Para** reflejar con precisión qué planes ofrece cada aseguradora y viceversa.

**Tareas:**
1. Diseñar y desarrollar una interfaz para visualizar y editar las relaciones entre planes y aseguradoras
2. Implementar la lógica para asociar múltiples planes a una aseguradora y viceversa
3. Crear Server Actions para establecer y eliminar relaciones
4. Desarrollar validaciones para evitar relaciones duplicadas o inválidas
5. Implementar una vista de resumen que muestre las relaciones existentes

**Criterios de Aceptación:**
- [ ] Existe una interfaz que permite ver y editar las relaciones entre planes y aseguradoras
- [ ] Se puede asociar múltiples planes a una aseguradora y múltiples aseguradoras a un plan
- [ ] Las relaciones se actualizan en tiempo real al ser modificadas
- [ ] No se permite crear relaciones duplicadas
- [ ] Existe una vista de resumen que muestra claramente qué planes ofrece cada aseguradora y qué aseguradoras ofrecen cada plan

**Estimación:** 3 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 5: Información Detallada de Planes

**Como** administrador del sistema,
**Quiero** poder ingresar y gestionar información detallada de cada plan,
**Para** proporcionar a los asesores y clientes una visión completa de los beneficios y características de cada plan.

**Tareas:**
1. Diseñar y desarrollar una interfaz para la entrada y edición de información detallada de planes
2. Implementar campos estructurados para diferentes tipos de beneficios (ej. cobertura hospitalaria, medicamentos, etc.)
3. Crear un editor de texto enriquecido para describir beneficios complejos
4. Desarrollar un sistema de versiones para trackear cambios en la información del plan
5. Implementar una vista previa de cómo se verá la información del plan para los asesores/clientes

**Criterios de Aceptación:**
- [ ] Existe una interfaz intuitiva para ingresar y editar información detallada de cada plan
- [ ] Se pueden ingresar diferentes tipos de beneficios de manera estructurada
- [ ] Hay un editor de texto enriquecido para describir beneficios complejos
- [ ] Los cambios en la información del plan se trackean con un sistema de versiones
- [ ] Existe una vista previa que muestra cómo verán la información los asesores/clientes
- [ ] La información se guarda automáticamente mientras se edita para prevenir pérdida de datos

**Estimación:** 4 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 6: Personalización de Planes

**Como** administrador del sistema,
**Quiero** poder especificar qué aspectos de cada plan son personalizables,
**Para** permitir a los asesores adaptar los planes a las necesidades específicas de los clientes.

**Tareas:**
1. Diseñar y desarrollar una interfaz para definir los aspectos personalizables de cada plan
2. Implementar la lógica para especificar rangos de valores para deducibles, coaseguros, y topes de seguro
3. Crear un sistema para definir coberturas extras opcionales y sus costos asociados
4. Desarrollar la lógica para calcular ajustes de precio basados en las personalizaciones
5. Implementar validaciones para asegurar que las personalizaciones estén dentro de los límites permitidos

**Criterios de Aceptación:**
- [ ] Existe una interfaz que permite definir qué aspectos de cada plan son personalizables
- [ ] Se pueden especificar rangos de valores para deducibles, coaseguros, y topes de seguro
- [ ] Es posible definir coberturas extras opcionales y sus costos asociados
- [ ] Hay un sistema de cálculo que ajusta el precio del plan basado en las personalizaciones seleccionadas
- [ ] Las personalizaciones se validan para asegurar que estén dentro de los límites permitidos
- [ ] Los asesores pueden ver y utilizar estas opciones de personalización al cotizar planes para clientes

**Estimación:** 5 días
**Asignado a:** Desarrollador Semi Senior, con apoyo del Desarrollador Junior

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Epic: Gestión y Seguimiento de Prospectos

## Descripción del Epic
Este Epic se centra en el desarrollo e implementación de un sistema integral para la gestión y seguimiento de prospectos en nuestra plataforma de seguros médicos. El objetivo principal es proporcionar a los asesores y administradores las herramientas necesarias para manejar eficientemente el ciclo de vida de los prospectos, desde la asignación inicial hasta el cierre de la venta.

## Objetivos
1. Implementar un sistema de asignación equitativa de prospectos a los asesores.
2. Desarrollar un mecanismo de notificación para nuevos prospectos asignados.
3. Crear una interfaz intuitiva para el seguimiento de prospectos por parte de los asesores.
4. Proporcionar a los administradores una vista general del estado de los folios y la capacidad de reasignarlos.
5. Optimizar el proceso de seguimiento para aumentar la tasa de conversión de prospectos a clientes.

## Historias de Usuario Incluidas
1. Gestión de folios
2. Asignación equitativa de prospectos
3. Notificación de nuevos prospectos
4. Seguimiento de prospectos

## Beneficios del Negocio
- [ ] Mejorar la eficiencia en la distribución de prospectos entre los asesores.
- [ ] Aumentar la tasa de conversión de prospectos a clientes mediante un seguimiento más efectivo.
- [ ] Proporcionar a los administradores una visión clara del rendimiento de los asesores y el estado de los prospectos.
- [ ] Reducir el tiempo de respuesta a nuevos prospectos, mejorando la satisfacción del cliente potencial.
- [ ] Optimizar el proceso de ventas a través de un seguimiento estructurado y organizado.

## Consideraciones Técnicas
- [ ] Utilizar Next.js 14 con App Router para la implementación.
- [ ] Aprovechar los Server Components y Server Actions de Next.js para operaciones del lado del servidor.
- [ ] Implementar TailwindCSS y Tremor para un diseño consistente y componentes de dashboard avanzados.
- [ ] Diseñar un algoritmo eficiente para la asignación equitativa de prospectos.
- [ ] Implementar un sistema de notificaciones en tiempo real y por correo electrónico.

## Riesgos Potenciales
- [ ] La implementación del algoritmo de asignación equitativa podría resultar más compleja de lo previsto.
- [ ] El sistema de notificaciones en tiempo real podría enfrentar desafíos de escalabilidad con un gran número de usuarios.
- [ ] La gestión de un gran volumen de prospectos podría afectar el rendimiento del sistema si no se maneja adecuadamente.

## Criterios de Éxito
- [ ] Los prospectos se asignan de manera equitativa entre los asesores activos.
- [ ] Los asesores reciben notificaciones oportunas sobre nuevos prospectos asignados.
- [ ] Los administradores pueden ver fácilmente el estado de todos los folios y reasignarlos cuando sea necesario.
- [ ] Los asesores pueden gestionar eficazmente sus prospectos a través de la interfaz de seguimiento.
- [ ] El sistema puede manejar un gran volumen de prospectos sin degradación del rendimiento.

## Estimación de Tiempo
Tiempo total estimado para el Epic: 2.5 semanas

## Dependencias
- [ ] Completación del Epic de Gestión de Usuarios y Accesos para asegurar la correcta autenticación de asesores y administradores.
- [ ] Integración con el sistema de gestión de planes y aseguradoras para proporcionar información relevante durante el seguimiento de prospectos.

Este Epic es crucial para el núcleo operativo del sistema de seguimiento de prospectos de seguros médicos, proporcionando las herramientas necesarias para una gestión eficiente del proceso de ventas.

---

## Historias de Usuario

---

### Historia 1: Gestión de Folios

**Como** administrador del sistema,
**Quiero** tener una vista general de todos los folios y su estatus,
**Para** poder monitorear el progreso de los prospectos y reasignarlos si es necesario.

**Tareas:**
1. Diseñar y desarrollar una interfaz de dashboard para la gestión de folios
2. Implementar filtros y búsqueda para folios por estatus, asesor asignado, fecha, etc.
3. Crear una funcionalidad de vista detallada para cada folio
4. Desarrollar la capacidad de reasignar folios a diferentes asesores
5. Implementar un sistema de etiquetas o categorías para los folios

**Criterios de Aceptación:**
- [ ] Existe un dashboard que muestra todos los folios con su estatus actual
- [ ] Se puede filtrar y buscar folios por diversos criterios (estatus, asesor, fecha, etc.)
- [ ] Cada folio tiene una vista detallada accesible desde el dashboard
- [ ] Los administradores pueden reasignar folios a diferentes asesores directamente desde la interfaz
- [ ] Se puede categorizar los folios mediante un sistema de etiquetas personalizable
- [ ] La interfaz es responsiva y funciona correctamente en dispositivos móviles y de escritorio

**Estimación:** 4 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 2: Asignación Equitativa de Prospectos

**Como** asesor,
**Quiero** recibir una distribución equitativa de nuevos prospectos,
**Para** tener oportunidades justas de venta y mantener una carga de trabajo balanceada.

**Tareas:**
1. Diseñar un algoritmo para la asignación equitativa de prospectos
2. Implementar la lógica de asignación en el backend
3. Crear un job programado para ejecutar la asignación periódicamente
4. Desarrollar un sistema de métricas para monitorear la equidad de las asignaciones
5. Implementar ajustes manuales para casos especiales (vacaciones, licencias, etc.)

**Criterios de Aceptación:**
- [ ] Los nuevos prospectos se asignan automáticamente a los asesores activos de forma equitativa
- [ ] El sistema considera la carga de trabajo actual de cada asesor al hacer nuevas asignaciones
- [ ] Existe un mecanismo para ajustar manualmente las asignaciones en casos especiales
- [ ] Se generan métricas que demuestran la equidad en la distribución de prospectos
- [ ] Los administradores pueden ver y auditar el historial de asignaciones

**Estimación:** 3 días
**Asignado a:** Desarrollador Semi Senior

---

### Historia 3: Notificación de Nuevos Prospectos

**Como** asesor,
**Quiero** recibir notificaciones inmediatas cuando se me asigne un nuevo prospecto,
**Para** poder responder rápidamente y aumentar las posibilidades de conversión.

**Tareas:**
1. Implementar un sistema de notificaciones en tiempo real en la aplicación
2. Desarrollar la funcionalidad de envío de correos electrónicos para nuevas asignaciones
3. Crear una página de preferencias de notificación para los asesores
4. Desarrollar un centro de notificaciones dentro de la aplicación

**Criterios de Aceptación:**
- [ ] Los asesores reciben notificaciones en tiempo real dentro de la aplicación cuando se les asigna un nuevo prospecto
- [ ] Se envía un correo electrónico al asesor con los detalles del nuevo prospecto asignado
- [ ] Los asesores pueden personalizar sus preferencias de notificación (email)
- [ ] Existe un centro de notificaciones donde los asesores pueden ver todas sus notificaciones pasadas

**Estimación:** 3 días
**Asignado a:** Desarrollador Junior, con supervisión del Desarrollador Semi Senior

---

### Historia 4: Seguimiento de Prospectos

**Como** asesor,
**Quiero** tener una interfaz intuitiva para dar seguimiento a mis prospectos asignados,
**Para** gestionar eficientemente el proceso de venta y aumentar la tasa de conversión.

**Tareas:**
1. Diseñar y desarrollar una interfaz de seguimiento de prospectos para asesores
2. Implementar un sistema de estados para el ciclo de vida del prospecto (nuevo, contactado, en negociación, cerrado, etc.)
3. Crear funcionalidad para registrar notas y actividades relacionadas con cada prospecto
4. Desarrollar un sistema de recordatorios y tareas pendientes
5. Implementar la capacidad de ver y generar cotizaciones directamente desde la interfaz de seguimiento
6. Crear un dashboard personal para cada asesor con métricas de rendimiento

**Criterios de Aceptación:**
- [ ] Existe una interfaz clara y fácil de usar para el seguimiento de prospectos
- [ ] Los asesores pueden actualizar el estado de un prospecto a través de un flujo intuitivo
- [ ] Se pueden agregar notas y registrar actividades para cada prospecto
- [ ] El sistema genera recordatorios automáticos para seguimientos pendientes
- [ ] Los asesores pueden generar y enviar cotizaciones directamente desde la interfaz de seguimiento
- [ ] Existe un dashboard personal que muestra métricas clave como tasa de conversión, tiempo promedio de cierre, etc.
- [ ] La interfaz es responsiva y funciona correctamente en dispositivos móviles y de escritorio

**Estimación:** 5 días
**Asignado a:** Desarrollador Semi Senior, con apoyo del Desarrollador Junior
