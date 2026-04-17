# Documento de Requisitos — Portal de APIs Empresarial (Proyecto SIOP) — MVP Hackathon

## Alcance MVP — Hackathon

### Restricciones del Hackathon

- **Tiempo restante:** 1 hora para entregar
- **Equipo:** 5 personas trabajando en paralelo
- **Objetivo:** MVP diferencial y funcional para demo ante jueces
- **Sin base de datos real:** Toda la persistencia se realiza con archivos JSON locales en una carpeta `/data`
- **Sin servicios externos reales:** OTP simulado, IA con respuestas pre-construidas, sin SMTP, sin S3, sin Redis, sin CloudWatch
- **Datos mock realistas:** Mínimo 8-10 APIs del dominio de seguros (emisión, renovación, siniestros, consultas, pólizas, cotización, cancelación, pagos)
- **Cada requisito es implementable por 1 persona en ~45 minutos**

### Funcionalidades Incluidas en el MVP

1. ✅ Catálogo público de APIs con búsqueda (impacto visual)
2. ✅ Visor Swagger/OpenAPI embebido (diferenciador técnico)
3. ✅ Flujo de login con OTP simulado (demuestra pensamiento de seguridad)
4. ✅ Asistente de IA con chat (factor wow para jueces)
5. ✅ Gestión del ciclo de vida de APIs (historia de gobernanza)
6. ✅ Sandbox básico interactivo (demo interactiva)

### Funcionalidades Excluidas (POST-MVP)

- ❌ Integración SMTP real (OTP simulado con código fijo "123456")
- ❌ Base de datos PostgreSQL (se usan archivos JSON en `/data`)
- ❌ Llamadas reales a LLM/IA (respuestas pre-construidas con pattern matching simple)
- ❌ Middleware RBAC complejo (validación simple de rol en memoria)
- ❌ Rate Limiting, Circuit Breakers, backoff exponencial
- ❌ Dashboard de observabilidad y métricas
- ❌ Flujo de solicitud de paso a producción
- ❌ Integración S3, Redis, CloudWatch
- ❌ Enmascaramiento avanzado de datos sensibles
- ❌ Versionamiento de APIs (solo v1)
- ❌ Autogeneración de documentación con IA real
- ❌ Notificaciones por correo electrónico
- ❌ Auditoría completa y logs centralizados
- ❌ Compresión gzip/brotli, caché avanzado, Green IT

---

## Introducción

Este documento define los requisitos para el MVP del Portal de APIs de Seguros Bolívar (Proyecto SIOP) en contexto de hackathon. La plataforma centraliza y documenta APIs del dominio asegurador mediante un catálogo interactivo con documentación OpenAPI, sandbox de pruebas simulado, gobernanza básica del ciclo de vida y un asistente de IA con respuestas pre-construidas. Toda la persistencia se realiza con archivos JSON locales. El stack utiliza Angular 19+ (Standalone) en el Frontend y Node.js 20.x + Express.js 4.x en el Backend, con el Design System @seguros-bolivar/ui-bundle.

## Glosario

- **Portal**: La aplicación web del Portal de APIs empresarial de Seguros Bolívar (Proyecto SIOP).
- **Catálogo_de_APIs**: Módulo del Portal que lista, clasifica y permite buscar todas las APIs registradas desde archivos JSON locales.
- **Visor_Swagger**: Componente del Portal que renderiza la documentación técnica de una API siguiendo el estándar OpenAPI 3.0/3.1 usando swagger-ui-dist.
- **Sandbox**: Entorno interactivo dentro del Portal que simula llamadas a APIs usando respuestas mock predefinidas en archivos JSON.
- **Asistente_IA**: Módulo de chat del Portal que responde consultas sobre APIs usando respuestas pre-construidas y pattern matching simple sobre el catálogo local.
- **Gestor_de_Ciclo_de_Vida**: Módulo del Portal que administra los estados de una API (Borrador, Publicada, Deprecada, Retirada) persistidos en archivos JSON.
- **Sistema_de_Autenticación**: Módulo del Portal responsable del login simulado mediante Email + OTP fijo ("123456"), con sesión JWT en memoria.
- **Almacén_JSON**: Carpeta `/data` del proyecto que contiene archivos JSON con datos mock de APIs, usuarios, respuestas de sandbox y respuestas del asistente IA.
- **Especificación_OpenAPI**: Documento en formato JSON o YAML que describe una API siguiendo el estándar OpenAPI 3.0 o 3.1.
- **Usuario_Público**: Visitante no autenticado que accede a la zona pública del Portal.
- **Usuario_Autenticado**: Usuario que ha completado el flujo de login simulado con OTP.
- **Usuario_Admin**: Usuario autenticado con rol de administrador para gestionar el ciclo de vida de APIs.
- **OTP**: Código de un solo uso simulado (valor fijo "123456") para demostrar el flujo de autenticación.
- **Datos_Mock**: Conjunto de datos realistas del dominio asegurador precargados en el Almacén_JSON para la demo.

---

## Requisitos

### Requisito 1: Catálogo Público de APIs con Búsqueda

**Historia de Usuario:** Como Usuario_Público, quiero explorar un catálogo visual de APIs de seguros sin autenticarme, para evaluar las capacidades de integración del portal.

#### Criterios de Aceptación

1. THE Catálogo_de_APIs SHALL cargar la lista de APIs desde el archivo `/data/apis.json` del Almacén_JSON y mostrar nombre, categoría, descripción resumida, ícono de categoría y estado de cada API con estado "Publicada".
2. THE Catálogo_de_APIs SHALL mostrar un mínimo de 8 APIs mock del dominio asegurador incluyendo: Emisión de Pólizas, Renovación de Pólizas, Consulta de Siniestros, Registro de Siniestros, Cotización de Seguros, Consulta de Pólizas, Cancelación de Pólizas y Consulta de Pagos.
3. WHEN un Usuario_Público escribe texto en el campo de búsqueda, THE Catálogo_de_APIs SHALL filtrar las APIs en tiempo real por nombre, categoría o descripción usando búsqueda local en memoria sin llamadas al Backend.
4. WHEN un Usuario_Público selecciona una API del Catálogo_de_APIs, THE Portal SHALL mostrar la información general de la API (nombre, categoría, descripción completa, casos de uso, equipo de contacto) sin exponer endpoints ni esquemas de autenticación.
5. WHEN un Usuario_Público intenta acceder al Visor_Swagger, Sandbox o funcionalidades de administración, THE Portal SHALL redirigir al Usuario_Público a la pantalla de login.

---

### Requisito 2: Visor Swagger/OpenAPI Interactivo

**Historia de Usuario:** Como Usuario_Autenticado, quiero consultar la documentación técnica completa de cada API en formato Swagger interactivo, para entender cómo integrar las APIs.

#### Criterios de Aceptación

1. WHEN un Usuario_Autenticado selecciona una API del Catálogo_de_APIs, THE Visor_Swagger SHALL renderizar la Especificación_OpenAPI completa cargada desde el archivo JSON correspondiente en `/data/specs/`, incluyendo endpoints, métodos HTTP, parámetros, esquemas de request/response y códigos de respuesta.
2. THE Visor_Swagger SHALL utilizar la librería swagger-ui-dist para renderizar las especificaciones OpenAPI 3.0 embebidas en un componente Angular standalone.
3. THE Visor_Swagger SHALL mostrar descripciones claras para cada parámetro, incluyendo tipo de dato, obligatoriedad y ejemplos precargados en la especificación mock.
4. WHEN un Usuario_Autenticado hace clic en "Try it out" dentro del Visor_Swagger, THE Visor_Swagger SHALL ejecutar la petición contra el Sandbox simulado del Backend y mostrar la respuesta mock con código HTTP, headers y body formateado.
5. THE Portal SHALL incluir al menos 3 especificaciones OpenAPI completas y detalladas en `/data/specs/` para las APIs de Emisión de Pólizas, Consulta de Siniestros y Cotización de Seguros.

---

### Requisito 3: Login Simulado con OTP

**Historia de Usuario:** Como usuario nuevo, quiero iniciar sesión mediante un flujo de OTP simulado, para acceder a las funcionalidades autenticadas del Portal durante la demo.

#### Criterios de Aceptación

1. WHEN un usuario ingresa una dirección de correo electrónico válida en el formulario de login, THE Sistema_de_Autenticación SHALL mostrar la pantalla de ingreso de código OTP y mostrar en consola del navegador el código simulado "123456".
2. WHEN un usuario ingresa el código OTP "123456", THE Sistema_de_Autenticación SHALL crear la sesión del usuario generando un JWT simulado almacenado en memoria y redirigir al catálogo autenticado.
3. IF un usuario ingresa un código OTP diferente a "123456", THEN THE Sistema_de_Autenticación SHALL mostrar un mensaje de error "Código inválido, intente nuevamente" y permitir reintentar.
4. WHEN un usuario inicia sesión por primera vez, THE Sistema_de_Autenticación SHALL registrar al usuario en el archivo `/data/users.json` del Almacén_JSON con rol "Externo" por defecto.
5. THE Sistema_de_Autenticación SHALL soportar un usuario precargado con rol "Admin" (email: admin@segurosbolivar.com) en el archivo `/data/users.json` para demostrar funcionalidades de administración.

---

### Requisito 4: Sandbox Básico Interactivo

**Historia de Usuario:** Como Usuario_Autenticado, quiero ejecutar llamadas de prueba simuladas contra las APIs, para ver el formato de las respuestas y validar mi entendimiento de la integración.

#### Criterios de Aceptación

1. WHEN un Usuario_Autenticado selecciona una API y configura una petición en el Sandbox con método HTTP, endpoint y body, THE Sandbox SHALL retornar una respuesta mock predefinida cargada desde `/data/sandbox-responses/` incluyendo código HTTP, headers simulados y body de respuesta.
2. THE Sandbox SHALL generar automáticamente ejemplos de request basados en la Especificación_OpenAPI de la API seleccionada, pre-llenando campos con datos de ejemplo del dominio asegurador.
3. THE Sandbox SHALL incluir respuestas mock para escenarios de éxito (HTTP 200) y escenarios de error (HTTP 400, HTTP 404, HTTP 500) para cada API, permitiendo al usuario seleccionar el escenario a simular.
4. THE Sandbox SHALL mostrar el tiempo de respuesta simulado (valor aleatorio entre 50ms y 500ms) y un Correlation-ID generado automáticamente en cada respuesta.
5. THE Sandbox SHALL mantener un historial en memoria de las últimas 10 peticiones realizadas durante la sesión activa, mostrando request y response de cada una.

---

### Requisito 5: Asistente de IA con Chat

**Historia de Usuario:** Como Usuario_Autenticado, quiero interactuar con un asistente de IA dentro del Portal, para obtener orientación sobre qué APIs utilizar según mi caso de uso.

#### Criterios de Aceptación

1. WHEN un Usuario_Autenticado escribe una consulta en el chat del Asistente_IA, THE Portal SHALL buscar coincidencias por palabras clave en el archivo `/data/ai-responses.json` y retornar la respuesta pre-construida más relevante.
2. THE Asistente_IA SHALL incluir respuestas pre-construidas para al menos 15 consultas comunes del dominio asegurador, incluyendo: "¿cómo emitir una póliza?", "¿cómo consultar siniestros?", "¿qué API uso para cotizar?", "¿cómo renovar una póliza?", "¿cómo cancelar una póliza?", entre otras.
3. WHEN el Asistente_IA encuentra una API relevante para la consulta, THE Portal SHALL incluir en la respuesta el nombre de la API, un enlace directo a la documentación en el Visor_Swagger y un ejemplo de código en cURL.
4. IF el Asistente_IA no encuentra coincidencias para la consulta del usuario, THEN THE Portal SHALL responder con un mensaje genérico: "No encontré información específica sobre tu consulta. Te sugiero explorar el catálogo de APIs o contactar al equipo de soporte."
5. THE Asistente_IA SHALL mostrar las respuestas con efecto de escritura progresiva (typing effect) para simular una experiencia de IA conversacional.

---

### Requisito 6: Gestión del Ciclo de Vida de APIs

**Historia de Usuario:** Como Usuario_Admin, quiero gestionar el ciclo de vida de cada API (crear, publicar, deprecar, retirar), para mantener el catálogo actualizado y demostrar gobernanza.

#### Criterios de Aceptación

1. THE Gestor_de_Ciclo_de_Vida SHALL soportar los siguientes estados para cada API: Borrador, Publicada, Deprecada y Retirada, persistidos en el archivo `/data/apis.json` del Almacén_JSON.
2. WHEN un Usuario_Admin cambia el estado de una API, THE Gestor_de_Ciclo_de_Vida SHALL actualizar el archivo `/data/apis.json`, registrar el cambio en `/data/audit-log.json` con usuario, fecha, estado anterior y estado nuevo, y reflejar el cambio inmediatamente en el Catálogo_de_APIs.
3. WHILE una API se encuentra en estado "Deprecada", THE Catálogo_de_APIs SHALL mostrar un indicador visual de color amarillo con el texto "Deprecada" y una fecha estimada de retiro.
4. WHEN un Usuario_Admin cambia el estado de una API a "Retirada", THE Catálogo_de_APIs SHALL ocultar la API de la vista pública y mostrarla solo en la vista de administración con un indicador visual de color rojo.
5. THE Gestor_de_Ciclo_de_Vida SHALL permitir al Usuario_Admin crear una nueva API proporcionando nombre, categoría, descripción, casos de uso y equipo de contacto, asignando automáticamente el estado "Borrador".

---

### Requisito 7: Datos Mock y Archivos JSON

**Historia de Usuario:** Como equipo de desarrollo, quiero contar con datos mock realistas y completos en archivos JSON, para que la demo funcione de extremo a extremo sin dependencias externas.

#### Criterios de Aceptación

1. THE Almacén_JSON SHALL contener el archivo `/data/apis.json` con un mínimo de 10 APIs del dominio asegurador, cada una con: id, nombre, categoría (Emisión, Renovación, Siniestros, Consultas, Cotización, Pagos, Cancelación, Autenticación), descripción, casos de uso, estado, versión, equipo de contacto y fecha de creación.
2. THE Almacén_JSON SHALL contener el directorio `/data/specs/` con al menos 3 especificaciones OpenAPI 3.0 completas en formato JSON para las APIs principales (Emisión de Pólizas, Consulta de Siniestros, Cotización de Seguros), incluyendo endpoints, schemas, ejemplos de request/response y códigos de error.
3. THE Almacén_JSON SHALL contener el archivo `/data/sandbox-responses/` con respuestas mock para escenarios de éxito y error de cada API, incluyendo datos realistas del dominio asegurador (números de póliza, nombres de asegurados, montos, fechas).
4. THE Almacén_JSON SHALL contener el archivo `/data/ai-responses.json` con al menos 15 pares de pregunta-respuesta pre-construidos para el Asistente_IA, cubriendo los casos de uso principales del dominio asegurador.
5. THE Almacén_JSON SHALL contener el archivo `/data/users.json` con al menos 2 usuarios precargados: un usuario con rol "Admin" (admin@segurosbolivar.com) y un usuario con rol "Externo" (demo@segurosbolivar.com).
6. THE Almacén_JSON SHALL contener el archivo `/data/audit-log.json` inicializado como un arreglo vacío para registrar los cambios de ciclo de vida durante la demo.
