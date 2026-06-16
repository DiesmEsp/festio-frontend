# Festio Frontend

Frontend de `Festio`, construido con `React + TypeScript + Vite`.

El proyecto implementa dos experiencias dentro de una misma SPA:

1. Flujo cliente B2C orientado a recomendacion conversacional de paquetes para eventos.
2. Panel proveedor B2B para gestionar inventario, paquetes y perfil.

## Resumen rapido

- Stack principal: `React 19`, `TypeScript`, `Vite`, `React Router`, `TanStack Query`, `Tailwind CSS`.
- Punto de entrada: `src/main.tsx`.
- Router principal: `src/App.tsx`.
- Flujo cliente: `src/ClienteApp.tsx`.
- Panel proveedor: `src/screens/proveedor/*`.
- Base URL de API: `VITE_API_BASE_URL` o fallback `http://127.0.0.1:8000`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Configuracion

Variable soportada:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Notas:

- En desarrollo, `vite.config.ts` tambien define proxy para `/api` hacia `http://127.0.0.1:8000`.
- El token de autenticacion se guarda en `localStorage` con la clave `festio_token`.

## Rutas principales

- `/` y `/chat`: flujo publico del cliente.
- `/proveedor/dashboard`: dashboard del proveedor.
- `/proveedor/inventario`: gestion de inventario.
- `/proveedor/paquetes`: gestion de paquetes.
- `/proveedor/perfil`: perfil publico del proveedor.

## Estructura principal

```text
src/
  App.tsx
  ClienteApp.tsx
  api.ts
  main.tsx
  components/
  hooks/
  lib/
  providers/
  screens/
    proveedor/
  services/
  types.ts
```

## Documentacion

- `docs/arquitectura.md`: arquitectura, modulos, rutas, estado y decisiones tecnicas.
- `docs/flujos-y-api.md`: flujos funcionales, endpoints, tipos y limitaciones actuales.

## Estado actual del proyecto

Hallazgos importantes del codigo actual:

- El flujo cliente usa estado local para navegar entre `chat`, `detail` y `success`; no usa rutas para esos pasos.
- El panel proveedor si usa rutas protegidas por rol.
- Existen dos capas de acceso a API: `src/api.ts` y `src/services/*`.
- No se detectaron tests automatizados ni configuracion de lint en el repositorio.

## Archivos clave

- `src/main.tsx`: monta `QueryClientProvider`, `BrowserRouter` y `AuthProvider`.
- `src/App.tsx`: declara rutas publicas y protegidas.
- `src/ClienteApp.tsx`: orquesta hooks y pantallas del flujo cliente.
- `src/providers/AuthProvider.tsx`: estado global de autenticacion.
- `src/services/*`: servicios del panel proveedor y auth.

## Build

La compilacion de produccion se realiza con:

```bash
npm run build
```

Esto ejecuta `tsc -b && vite build`.
