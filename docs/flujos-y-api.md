# Flujos, Endpoints y Contratos

## Flujo cliente B2C

El recorrido principal del usuario cliente vive en `src/ClienteApp.tsx` y se apoya en cuatro hooks.

## Paso 1: chat conversacional

Archivos:

- `src/screens/chat-screen.tsx`
- `src/hooks/use-chat.ts`
- `src/hooks/use-recomendar.ts`

Comportamiento:

1. El usuario escribe una necesidad o usa una tarjeta sugerida.
2. `useChat` agrega el mensaje al historial local.
3. `useRecomendarEvento` llama al backend con:
   - `mensaje`
   - `historial`
   - `estado_conversacion`
4. La respuesta del asistente se agrega como nuevo mensaje.
5. La recomendacion mas reciente alimenta el panel de resultados.

Endpoint usado:

- `POST /api/chat/recomendar`

## Paso 2: seleccion de proveedor y carga de detalle

Archivo:

- `src/hooks/use-booking-detail.ts`

Comportamiento:

1. El usuario selecciona una opcion desde `ResultsPanel`.
2. Se guarda el proveedor seleccionado.
3. Se consulta el catalogo de servicios del proveedor.
4. Si la carga funciona, la app cambia de `chat` a `detail`.

Endpoint usado:

- `GET /api/catalogo/servicios?proveedor_id={id}`

## Paso 3: configuracion del evento y extras

Archivos:

- `src/screens/detail-screen.tsx`
- `src/hooks/use-extras.ts`
- `src/lib/format.ts`

El usuario completa:

- fecha
- hora de inicio
- direccion
- invitados
- extras opcionales

Calculos derivados:

- duracion estimada del paquete
- subtotal de extras
- total
- adelanto del 20%
- saldo pendiente del 80%
- hora de fin calculada

## Paso 4: pre-reserva

Archivo:

- `src/hooks/use-payment-flow.ts`

Comportamiento:

1. Valida fecha, hora y direccion.
2. Arma `PreReservaPayload`.
3. Llama al backend para bloquear temporalmente la reserva.
4. Si responde OK, abre `PaymentModal`.

Endpoint usado:

- `POST /api/reservas/prebloquear`

## Paso 5: checkout simulado

Archivos:

- `src/screens/payment-modal.tsx`
- `src/hooks/use-payment-flow.ts`

Comportamiento:

1. El usuario elige `login` o `register`.
2. Completa un metodo de pago.
3. Se envia un payload normalizado al checkout simulado.
4. Al confirmar, la app pasa a `success`.

Endpoint usado:

- `POST /api/reservas/checkout-simulado/{reservaTempId}`

## Paso 6: comprobante final

Archivo:

- `src/screens/success-screen.tsx`

Muestra:

- codigo de reserva formateado
- proveedor
- paquete
- fecha y direccion
- detalle de items
- total, adelanto y saldo

## Flujo proveedor B2B

## Autenticacion y acceso

Archivos:

- `src/components/AuthModal.tsx`
- `src/providers/AuthProvider.tsx`
- `src/components/ProtectedRoute.tsx`

Comportamiento:

1. Login o registro desde modal global.
2. `AuthProvider` guarda `festio_token` en `localStorage`.
3. `ProtectedRoute` impide acceso a `/proveedor/*` sin sesion valida.
4. Si el usuario es proveedor, navega a `/proveedor/dashboard`.

## Dashboard

Archivo:

- `src/screens/proveedor/DashboardScreen.tsx`

Endpoint:

- `GET /api/proveedores/mi-dashboard`

Datos mostrados:

- total de servicios
- total de paquetes
- total de reservas

## Inventario

Archivos:

- `src/screens/proveedor/InventarioScreen.tsx`
- `src/services/inventarioService.ts`
- `src/services/catalogoService.ts`

Capacidades actuales de UI:

- listar inventario
- crear item
- eliminar item

Capacidades del servicio que existen aunque la UI no las expone por completo:

- obtener detalle por id
- actualizar item

## Paquetes

Archivos:

- `src/screens/proveedor/PaquetesScreen.tsx`
- `src/services/paquetesProveedorService.ts`

Capacidades actuales de UI:

- listar paquetes
- crear paquetes con composicion de servicios
- eliminar paquetes

Capacidades del servicio no expuestas completamente en UI:

- obtener paquete por id
- actualizar paquete

## Perfil

Archivos:

- `src/screens/proveedor/PerfilScreen.tsx`
- `src/services/proveedorService.ts`

Capacidades:

- leer perfil publico del proveedor
- editar `nombre_empresa`, `descripcion`, `distrito` y `capacidad_humana_total`

## Endpoints del frontend

## 1. Endpoints publicos / flujo cliente

Definidos en `src/api.ts`.

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/api/chat/recomendar` | Motor conversacional y recomendacion |
| `GET` | `/api/catalogo/servicios?proveedor_id={id}` | Cargar servicios del proveedor seleccionado |
| `POST` | `/api/reservas/prebloquear` | Crear pre-reserva temporal |
| `POST` | `/api/reservas/checkout-simulado/{reservaTempId}` | Confirmar reserva con pago simulado |

## 2. Endpoints de autenticacion

Definidos en `src/services/authService.ts`.

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Login global |
| `POST` | `/api/auth/registro` | Registro cliente |
| `POST` | `/api/auth/registro-proveedor` | Registro proveedor |
| `GET` | `/api/auth/me` | Recuperar usuario autenticado |

## 3. Endpoints de catalogo

Definidos en `src/services/catalogoService.ts`.

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/api/catalogo/categorias` | Categorias para inventario y paquetes |
| `GET` | `/api/catalogo/tematicas?categoria_id={id}` | Tematicas por categoria |

## 4. Endpoints del proveedor

### Inventario

Definidos en `src/services/inventarioService.ts`.

| Metodo | Endpoint |
| --- | --- |
| `GET` | `/api/proveedor/inventario` |
| `GET` | `/api/proveedor/inventario/{id}` |
| `POST` | `/api/proveedor/inventario` |
| `PATCH` | `/api/proveedor/inventario/{id}` |
| `DELETE` | `/api/proveedor/inventario/{id}` |

### Paquetes

Definidos en `src/services/paquetesProveedorService.ts`.

| Metodo | Endpoint |
| --- | --- |
| `GET` | `/api/proveedor/paquetes` |
| `GET` | `/api/proveedor/paquetes/{id}` |
| `POST` | `/api/proveedor/paquetes` |
| `PATCH` | `/api/proveedor/paquetes/{id}` |
| `DELETE` | `/api/proveedor/paquetes/{id}` |

### Perfil y dashboard

Definidos en `src/services/proveedorService.ts`.

| Metodo | Endpoint |
| --- | --- |
| `GET` | `/api/proveedores/mi-perfil` |
| `PATCH` | `/api/proveedores/mi-perfil` |
| `GET` | `/api/proveedores/mi-dashboard` |

## Tipos mas importantes

Definidos en `src/types.ts`.

### Auth

- `RolUsuario`
- `TokenResponse`
- `AuthUser`
- `RegistroClienteDraft`
- `LoginDraft`
- `RegisterDraft`

### Recomendacion y reserva

- `ChatMessage`
- `ChatPayload`
- `RecomendacionRequest`
- `RecomendacionResponse`
- `ProveedorRecomendado`
- `PaqueteRecomendado`
- `PreReservaPayload`
- `PreReservaResponse`
- `CheckoutReservaResponse`

### Catalogo y proveedor

- `Categoria`
- `Tematica`
- `ServicioProducto`
- `Paquete`
- `DetallePaquete`
- `ProveedorPerfil`
- `DashboardStats`

## Configuracion y entorno

Variables y defaults observados en codigo:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Otras configuraciones:

- proxy de Vite para `/api`
- alias `@/*`
- `strict: true` en TypeScript

## Limitaciones actuales detectadas

1. El wizard cliente no usa rutas por paso.
2. La capa de API esta duplicada entre `src/api.ts` y `src/services/apiClient.ts`.
3. El checkout simulado usa login/register desacoplado de la auth global.
4. No hay tests visibles en el repositorio.
5. No se detecta pipeline de lint visible.
6. Existen archivos secundarios o no integrados, como `src/screens/LoginScreen.tsx`.

## Recomendaciones para futuros cambios

1. Unificar la capa de API sobre una sola abstraccion.
2. Migrar el flujo cliente a rutas reales si se necesita deep-linking o persistencia por refresh.
3. Homogeneizar manejo de datos con React Query en panel proveedor.
4. Agregar tests al menos para hooks de flujo y adaptadores de API.
