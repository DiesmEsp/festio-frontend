# Arquitectura del Proyecto

## Vision general

`festio-frontend` es una SPA que combina dos dominios funcionales:

1. Cliente B2C: recomendacion conversacional de paquetes para eventos, detalle de reserva y checkout simulado.
2. Proveedor B2B: panel autenticado para administrar inventario, paquetes y perfil.

La aplicacion no esta separada en apps distintas. Ambos dominios conviven en el mismo arbol React y comparten autenticacion, tipos y configuracion base.

## Stack y tooling

Segun `package.json` y configuracion del repo:

- `React 19`
- `TypeScript 5`
- `Vite 7`
- `react-router-dom 7`
- `@tanstack/react-query`
- `react-hook-form`
- `zod`
- `tailwindcss 4`
- `lucide-react`

Configuracion relevante:

- Alias `@/* -> src/*` en `tsconfig.json` y `vite.config.ts`.
- Dev server con proxy de `/api` a `http://127.0.0.1:8000`.
- `shadcn/ui` esta configurado en `components.json`, pero su uso real es minimo.

## Punto de entrada

Arbol principal de ejecucion:

```text
index.html
  -> src/main.tsx
    -> QueryClientProvider
      -> BrowserRouter
        -> AuthProvider
          -> App
```

Archivos clave:

- `src/main.tsx`
- `src/App.tsx`
- `src/providers/AuthProvider.tsx`

## Router y navegacion

### Rutas declaradas en `src/App.tsx`

- `/` -> `ClienteApp`
- `/chat` -> `ClienteApp`
- `/proveedor/*` -> `ProtectedRoute` + `ProveedorLayout`
- `*` -> redireccion a `/`

### Observacion importante

El flujo cliente no navega con URLs internas para cada paso. `ClienteApp` usa un estado local `screen` con tres valores:

- `chat`
- `detail`
- `success`

Eso implica que el wizard del cliente:

- no es deep-linkeable
- no conserva bien el estado ante refresh
- depende completamente del estado en memoria del componente

## Modulos principales

## 1. Flujo cliente

Archivo orquestador: `src/ClienteApp.tsx`

Responsabilidades:

- renderizar el header publico
- gestionar el flujo de pantallas
- conectar hooks de chat, detalle, extras y pago

Pantallas involucradas:

- `src/screens/chat-screen.tsx`
- `src/screens/detail-screen.tsx`
- `src/screens/payment-modal.tsx`
- `src/screens/success-screen.tsx`

Hooks involucrados:

- `src/hooks/use-chat.ts`
- `src/hooks/use-booking-detail.ts`
- `src/hooks/use-extras.ts`
- `src/hooks/use-payment-flow.ts`

## 2. Panel proveedor

Entrada protegida por rol `PROVEEDOR`:

- `src/components/ProtectedRoute.tsx`

Layout:

- `src/screens/proveedor/ProveedorLayout.tsx`

Pantallas:

- `DashboardScreen`
- `InventarioScreen`
- `PaquetesScreen`
- `PerfilScreen`

## 3. Autenticacion global

Proveedor de contexto:

- `src/providers/AuthProvider.tsx`

Wrapper del contexto:

- `src/hooks/useAuth.ts`

Modal global:

- `src/components/AuthModal.tsx`

Caracteristicas:

- mantiene `user`, `token`, `isAuthenticated`, `isLoading`
- persiste token en `localStorage`
- valida sesion inicial llamando `GET /api/auth/me`
- expone acciones de login, registro cliente, registro proveedor y logout

## 4. Capa de API

El proyecto usa dos accesos distintos a backend.

### Capa A: `src/api.ts`

Usada por el flujo cliente publico/conversacional.

Incluye:

- recomendacion de chat
- pre-reserva
- checkout simulado
- listado de servicios de un proveedor

### Capa B: `src/services/*`

Usada por autenticacion y panel proveedor.

Base comun:

- `src/services/apiClient.ts`

Caracteristicas:

- agrega `Authorization: Bearer <token>` si existe `festio_token`
- parsea errores de backend
- soporta `204 No Content`

## Estado y patrones de datos

### Estado global

- autenticacion en `AuthProvider`

### Estado local por flujo

- `ClienteApp` administra la navegacion del flujo cliente
- hooks locales encapsulan detalle, extras y checkout
- panel proveedor usa `useState` + `useEffect` por pantalla

### React Query

Su uso actual es puntual, no transversal:

- solo la recomendacion conversacional en `use-recomendar.ts` usa `useMutation`

El resto del proyecto consume API con llamadas imperativas desde componentes o hooks.

## Tipos y contratos

Archivo principal:

- `src/types.ts`

Este archivo concentra modelos de:

- autenticacion y roles
- catalogo e inventario
- paquetes y detalles
- recomendacion conversacional
- pre-reserva y checkout
- estado de UI

Validacion runtime:

- `src/lib/schemas.ts`

Actualmente la validacion con `zod` se usa sobre todo para la respuesta del endpoint de recomendacion.

## Estilos y UI

Hay un enfoque hibrido:

- `src/styles.css`: estilos custom grandes para el flujo cliente
- `src/tailwind.css`: tokens y base de Tailwind
- Tailwind utility classes: mas presentes en el panel proveedor

Tambien existen componentes `ui` tipo shadcn en `src/components/ui/*`, pero no forman parte central del flujo actual.

## Estructura de carpetas

```text
src/
  api.ts                  # API del flujo cliente
  App.tsx                 # Router principal
  ClienteApp.tsx          # Orquestador del flujo cliente
  main.tsx                # Bootstrap React
  types.ts                # Tipos del dominio
  components/             # Componentes compartidos y de UI
  hooks/                  # Hooks del flujo cliente y auth
  lib/                    # Formato, constantes y schemas
  providers/              # Context providers
  screens/                # Pantallas B2C
  screens/proveedor/      # Pantallas B2B proveedor
  services/               # Servicios autenticados
```

## Flujos de alto nivel

### Cliente

```text
Chat -> Recomendacion -> Seleccion de proveedor -> Detalle -> Pre-reserva -> Pago -> Exito
```

### Proveedor

```text
Login/Register -> Dashboard -> Inventario / Paquetes / Perfil
```

## Decisiones observables en el codigo

1. La app prioriza velocidad de implementacion sobre modularidad estricta.
2. El dominio cliente y el dominio proveedor comparten repo y runtime.
3. La navegacion del cliente fue modelada como wizard local, no como flujo de rutas.
4. La capa de datos no esta unificada aun.

## Hallazgos y limitaciones actuales

- No se detectaron tests automatizados en el repositorio.
- No se detecto configuracion de lint visible.
- Existen metodos de actualizar inventario y paquetes en servicios, pero la UI actual solo crea y elimina.
- Existe codigo aparentemente no usado o secundario, por ejemplo `src/screens/LoginScreen.tsx` y `src/components/provider-grid.tsx`.
- La autenticacion del checkout simulado no actualiza el `AuthProvider`; es un flujo desacoplado del login global.

## Archivos mas importantes para onboarding

- `src/main.tsx`
- `src/App.tsx`
- `src/ClienteApp.tsx`
- `src/providers/AuthProvider.tsx`
- `src/api.ts`
- `src/services/apiClient.ts`
- `src/types.ts`
