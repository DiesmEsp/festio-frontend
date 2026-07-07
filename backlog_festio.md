# 📋 Backlog de Tareas Pendientes — Festio Backend

> **Fecha:** 2026-06-26  
> **Alcance:** Directorio `app/` (API FastAPI + servicios + modelos)  
> **Convención de prioridad:** 🔴 Crítico · 🟠 Alto · 🟡 Medio · 🟢 Bajo

---

## 🔴 1. Seguridad y Autorización

### TASK-SEC-01 — Falta control de roles en endpoints administrativos
**Prioridad:** 🔴 Crítico  
**Archivos:** [catalogo.py](file:///d:/desarrollo-uni/formación-festio/app/routers/catalogo.py), [usuarios.py](file:///d:/desarrollo-uni/formación-festio/app/routers/usuarios.py), [proveedores.py](file:///d:/desarrollo-uni/formación-festio/app/routers/proveedores.py), [personal.py](file:///d:/desarrollo-uni/formación-festio/app/routers/personal.py)

Actualmente muchos endpoints solo validan que haya un token válido (`get_current_user`), pero **no validan el ROL**. Esto significa que un `CLIENTE` puede crear categorías, modificar proveedores, o eliminar personal.

**Qué hacer:**
- Usar `require_role(RolUsuario.ADMIN)` en endpoints administrativos (CRUD categorías, temáticas, gestión usuarios).
- Usar `require_role(RolUsuario.PROVEEDOR)` en endpoints de personal y catálogo de servicios.
- Ya existe la dependencia [require_role](file:///d:/desarrollo-uni/formación-festio/app/core/dependencies.py#L53-L69) implementada, solo falta usarla.

**Endpoints afectados:**
| Router | Endpoint | Rol requerido |
|---|---|---|
| `catalogo.py` | `POST /categorias`, `POST /tematicas` | ADMIN |
| `catalogo.py` | `POST /servicios`, `PATCH /servicios`, `DELETE /servicios` | ADMIN o PROVEEDOR |
| `usuarios.py` | `GET /`, `PATCH /{id}/estado` | ADMIN |
| `personal.py` | `POST /`, `PATCH /{id}`, `DELETE /{id}` | PROVEEDOR |
| `proveedores.py` | `POST /`, `PATCH /{id}` | ADMIN |
| `pagos.py` | `POST /{id}/aprobar`, `POST /{id}/rechazar` | ADMIN (o webhook) |

**Criterio de aceptación:**
- Un CLIENTE recibe `403 Forbidden` al intentar crear una categoría.
- Un PROVEEDOR puede crear su personal pero no el de otro proveedor.

---

### TASK-SEC-02 — El webhook de pagos no tiene autenticación
**Prioridad:** 🔴 Crítico  
**Archivo:** [pagos.py](file:///d:/desarrollo-uni/formación-festio/app/routers/pagos.py#L22-L38)

Los endpoints `POST /{pago_id}/aprobar` y `POST /{pago_id}/rechazar` están **completamente abiertos** (sin `Depends(get_current_user)`). Cualquier persona con acceso a la URL puede aprobar o rechazar pagos.

**Qué hacer:**
- Opción A: Agregar un header secreto tipo `X-Webhook-Secret` que se valide contra una variable de entorno.
- Opción B: Proteger con `require_role(RolUsuario.ADMIN)` si se maneja desde un panel admin.

**Criterio de aceptación:**
- Las solicitudes sin el secreto correcto reciben `401 Unauthorized`.

---

### TASK-SEC-03 — Los endpoints de notificaciones no validan ownership
**Prioridad:** 🟠 Alto  
**Archivo:** [notificaciones.py](file:///d:/desarrollo-uni/formación-festio/app/routers/notificaciones.py#L13-L20)

`GET /usuario/{usuario_id}` permite que cualquier usuario autenticado vea las notificaciones de **otro** usuario. Solo deberían poder ver las propias o un ADMIN ver las de otros.

**Qué hacer:**
- Comparar `usuario_id` del path con `usuario.id` del token JWT.
- Permitir acceso si son iguales, o si el usuario es ADMIN.

**Criterio de aceptación:**
- Un cliente solo ve sus propias notificaciones.
- Un admin puede ver las de cualquier usuario.

---

### TASK-SEC-04 — No se valida ownership en acciones sobre recursos
**Prioridad:** 🟠 Alto  
**Archivos:** [reservas.py](file:///d:/desarrollo-uni/formación-festio/app/routers/reservas.py#L160-L168), [personal.py](file:///d:/desarrollo-uni/formación-festio/app/routers/personal.py)

- `PATCH /{reserva_id}/cancelar`: Cualquier usuario autenticado puede cancelar **cualquier** reserva.
- Los endpoints de Personal no verifican que el `proveedor_id` del body pertenezca al proveedor autenticado.

**Qué hacer:**
- Verificar que la reserva a cancelar pertenece al usuario autenticado.
- Verificar que el personal se crea/edita solo para el proveedor autenticado.

---

## 🟠 2. Lógica de Negocio Faltante

### TASK-BIZ-01 — Falta política de cancelación con tiempo límite
**Prioridad:** 🟠 Alto  
**Archivo:** [reserva_gestion_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/reserva/reserva_gestion_service.py#L24-L37)

Actualmente `cancelar_reserva()` solo verifica que no esté `COMPLETADA`, pero no hay reglas de negocio como:
- ¿Se puede cancelar 1 hora antes del evento? ¿Se devuelve el dinero?
- ¿Se libera la ocupación de inventario/personas al cancelar?

**Qué hacer:**
1. Validar un tiempo mínimo antes del evento para permitir la cancelación (ej. 48 horas).
2. Liberar los registros de `OcupacionServicioProducto` y `OcupacionGlobalProveedor`.
3. Actualizar el `monto_pendiente` y crear una política de reembolso.

**Criterio de aceptación:**
- Si faltan < 48 horas para el evento, la cancelación es rechazada con mensaje descriptivo.
- Al cancelar, el stock se libera y queda disponible para nuevas reservas.

---

### TASK-BIZ-02 — No se previene doble reseña del mismo usuario
**Prioridad:** 🟠 Alto  
**Archivo:** [resena_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/resena_service.py#L55-L85)

Un usuario puede crear múltiples reseñas para el mismo proveedor, inflando artificialmente la calificación promedio.

**Qué hacer:**
- Verificar si ya existe una reseña del `usuario_id` para el `proveedor_id` antes de crear una nueva.
- Retornar `409 Conflict` si ya reseñó.

**Criterio de aceptación:**
- Un usuario solo puede dejar una reseña por proveedor.
- Si intenta crear otra, recibe error `409` con mensaje claro.

---

### TASK-BIZ-03 — Validación redundante de calificación en servicio (ya la hace Pydantic)
**Prioridad:** 🟡 Medio  
**Archivo:** [resena_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/resena_service.py#L61-L64) y [resena_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/resena_service.py#L93-L96)

Las líneas `if not (1 <= datos.calificacion <= 5)` ya son redundantes porque los schemas Pydantic (`ResenaCreate` y `ResenaPublicaCreate`) ahora validan con `Field(ge=1, le=5)`. FastAPI rechaza la petición con 422 antes de llegar al servicio.

**Qué hacer:**
- Eliminar las validaciones manuales de `calificacion` en `crear_resena()` y `crear_resena_publica()`.

---

### TASK-BIZ-04 — `pago_service.py` usa `db: Session` directamente en vez de repositorios
**Prioridad:** 🟡 Medio  
**Archivo:** [pago_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/pago_service.py)

Mientras los demás servicios usan el patrón Repository (`proveedor_repo`, `servicio_repo`, etc.), `pago_service` recibe `db: Session` directamente y hace `db.query(...)`. Esto rompe la consistencia y dificulta los tests unitarios con mocks.

**Qué hacer:**
- Refactorizar para recibir `PagoTransaccionRepository` en vez de `Session`.
- Actualizar el router `pagos.py` para inyectar el repo con `Depends()`.

---

### TASK-BIZ-05 — `notificacion_service.py` mezcla firmas `repo` y `db: Session`
**Prioridad:** 🟡 Medio  
**Archivos:** [notificacion_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/notificacion_service.py#L44-L64), [pago_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/pago_service.py#L94-L99)

La función `notificar_confirmacion_reserva()` recibe un `repo: NotificacionRepository`, pero es llamada desde `pago_service.aprobar_pago_completo()` que recibe `db: Session`. En la llamada actual, se pasa `db` donde se espera un `repo`, lo cual **puede fallar en runtime**.

**Qué hacer:**
- Verificar si la llamada actual funciona o lanza error.
- Crear el `NotificacionRepository(db)` dentro de `aprobar_pago_completo()` antes de pasar a `notificacion_service`.

---

### TASK-BIZ-06 — No hay endpoint para completar una reserva (`COMPLETADA`)
**Prioridad:** 🟡 Medio  
**Archivo:** [reserva_gestion_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/reserva/reserva_gestion_service.py)

El enum `EstadoReserva` tiene `COMPLETADA`, pero **no existe un endpoint para marcar una reserva como completada** después de que el evento termina. Tampoco existe un flujo para registrar el pago del 90% restante presencial.

**Qué hacer:**
1. Crear `PATCH /reservas/{id}/completar` (solo PROVEEDOR o ADMIN).
2. Validar que se haya registrado un pago del saldo pendiente (`SALDO_PRESENCIAL`).
3. Cambiar estado a `COMPLETADA`.

---

### TASK-BIZ-07 — `datetime.utcnow()` está deprecado en Python 3.12+
**Prioridad:** 🟢 Bajo  
**Archivos:** [checkout_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/reserva/checkout_service.py#L207), [security.py](file:///d:/desarrollo-uni/formación-festio/app/core/security.py#L16), [reserva_gestion_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/reserva/reserva_gestion_service.py#L35)

`datetime.utcnow()` está deprecado desde Python 3.12. El reemplazo es `datetime.now(timezone.utc)`.

**Qué hacer:**
- Reemplazar todas las ocurrencias de `datetime.utcnow()` por `datetime.now(timezone.utc)`.

---

## 🔴 3. Tests (TODOS VACÍOS)

> [!CAUTION]
> Los 4 archivos de tests existentes están **completamente vacíos** (0 bytes). No hay ni un solo test automatizado en el proyecto.

### TASK-TEST-01 — Tests de autenticación y registro
**Prioridad:** 🔴 Crítico  
**Archivo:** [test_auth.py](file:///d:/desarrollo-uni/formación-festio/tests/test_auth.py)

**Tests a implementar:**
```python
# Usando pytest + TestClient de FastAPI
def test_registro_cliente_exitoso()
def test_registro_email_duplicado_retorna_400()
def test_registro_password_corta_retorna_422()   # ← nueva validación
def test_registro_ruc_invalido_retorna_422()      # ← nueva validación
def test_registro_telefono_invalido_retorna_422() # ← nueva validación
def test_login_exitoso_retorna_token()
def test_login_credenciales_incorrectas_retorna_401()
def test_login_cuenta_inactiva_retorna_403()
def test_me_retorna_datos_usuario()
def test_me_sin_token_retorna_401()
```

---

### TASK-TEST-02 — Tests de reservas y checkout
**Prioridad:** 🔴 Crítico  
**Archivo:** [test_reservas.py](file:///d:/desarrollo-uni/formación-festio/tests/test_reservas.py)

**Tests a implementar:**
```python
def test_prebloquear_fecha_pasada_retorna_422()    # ← nueva validación
def test_prebloquear_fin_antes_inicio_retorna_422()# ← nueva validación
def test_prebloquear_exitoso_retorna_temp_id()
def test_prebloquear_proveedor_inexistente_retorna_404()
def test_prebloquear_paquete_inactivo_retorna_404()
def test_checkout_simulado_bloqueo_expirado_retorna_408()
def test_checkout_simulado_exitoso()
def test_checkout_sin_datos_cliente_retorna_400()
def test_cancelar_reserva_completada_retorna_400()
def test_mis_reservas_retorna_lista()
def test_cantidad_cero_retorna_422()               # ← nueva validación
```

---

### TASK-TEST-03 — Tests de pagos
**Prioridad:** 🟠 Alto  
**Archivo:** [test_pagos.py](file:///d:/desarrollo-uni/formación-festio/tests/test_pagos.py)

**Tests a implementar:**
```python
def test_registrar_pago_exitoso()
def test_registrar_pago_monto_negativo_retorna_422()  # ← nueva validación
def test_registrar_pago_reserva_inexistente_retorna_404()
def test_aprobar_pago_exitoso()
def test_rechazar_pago_y_notificacion()
def test_comprobante_generado_despues_aprobacion()
def test_comprobante_reserva_sin_pago_retorna_404()
```

---

### TASK-TEST-04 — Tests de disponibilidad
**Prioridad:** 🟠 Alto  
**Archivo:** [test_disponibilidad.py](file:///d:/desarrollo-uni/formación-festio/tests/test_disponibilidad.py)

**Tests a implementar:**
```python
def test_consultar_disponibilidad_todo_disponible()
def test_consultar_stock_agotado_retorna_no_disponible()
def test_consultar_capacidad_humana_excedida()
def test_consultar_proveedor_inexistente()
def test_bloqueo_temporal_cuenta_como_ocupacion()
```

---

### TASK-TEST-05 — Tests de validaciones Pydantic (schemas)
**Prioridad:** 🟡 Medio  
**Archivo nuevo:** `tests/test_schemas.py`

Tests unitarios puros (sin BD) que validen que los schemas rechazan data inválida:
```python
def test_usuario_nombre_vacio_retorna_error()
def test_usuario_ruc_formato_invalido()
def test_usuario_telefono_no_peruano()
def test_evento_fecha_pasada()
def test_evento_fin_antes_inicio()
def test_detalle_cantidad_negativa()
def test_pago_monto_cero()
def test_resena_calificacion_fuera_rango()
def test_servicio_precio_negativo()
```

---

### TASK-TEST-06 — Configurar `conftest.py` con BD de pruebas
**Prioridad:** 🔴 Crítico  
**Archivo nuevo:** `tests/conftest.py`

Sin un `conftest.py` con fixtures para la BD y el TestClient, **ningún test de integración puede funcionar**.

**Qué debe incluir:**
```python
# Fixture de BD SQLite en memoria
# Fixture de TestClient con la app de FastAPI
# Fixture de usuario autenticado (cliente, proveedor, admin)
# Override de get_db para usar la BD de pruebas
# Override de redis_client con un mock
```

---

## 🟡 4. Calidad de Código y Mejoras

### TASK-QA-01 — Endpoint de clientes no tiene protección
**Prioridad:** 🟡 Medio  
**Archivo:** [clientes.py](file:///d:/desarrollo-uni/formación-festio/app/routers/clientes.py)

`GET /clientes` y `POST /clientes` están **completamente abiertos** (sin autenticación).

**Qué hacer:**
- `GET /` → `require_role(RolUsuario.ADMIN)`
- `POST /` → `require_role(RolUsuario.ADMIN)` o eliminar (el registro de clientes ya lo maneja `auth_service`).

---

### TASK-QA-02 — Paginación ausente en todos los endpoints de listado
**Prioridad:** 🟡 Medio  
**Archivos:** Todos los routers con `GET /` que retornan listas.

Ningún endpoint de listado tiene paginación. Con muchos registros, las respuestas serán enormes.

**Qué hacer:**
- Agregar parámetros `skip: int = Query(0, ge=0)` y `limit: int = Query(20, ge=1, le=100)` a los endpoints de listado.
- Aplicar `.offset(skip).limit(limit)` en las queries.

**Endpoints afectados:** `/usuarios`, `/clientes`, `/proveedores`, `/personal/proveedor/{id}`, `/catalogo/servicios`, `/resenas/proveedor/{id}`, `/notificaciones/usuario/{id}`, `/reservas/mis-reservas`.

---

### TASK-QA-03 — El `BaseRepository.update()` tiene firma inconsistente
**Prioridad:** 🟢 Bajo  
**Archivo:** [base.py](file:///d:/desarrollo-uni/formación-festio/app/repositories/base.py#L44-L70)

`update()` espera `db_obj: ModelType` como primer argumento, pero en `proveedor_service.py` se llama como `repo.update(proveedor_id, datos)` pasando un `int`, no un objeto. Esto funciona si los repos concretos override, pero es propenso a errores.

**Qué hacer:**
- Verificar que todos los repos concretos que usan `update` tengan la firma correcta.
- Documentar la firma esperada.

---

### TASK-QA-04 — El comprobante autogenerado no contempla concurrencia
**Prioridad:** 🟢 Bajo  
**Archivo:** [pago_service.py](file:///d:/desarrollo-uni/formación-festio/app/services/pago_service.py#L147-L151)

La generación de número correlativo `(ultimo.id + 1)` puede generar duplicados bajo carga concurrente. Dos requests simultáneos leen el mismo `ultimo.id`.

**Qué hacer:**
- Usar una secuencia en la BD o `SELECT MAX(id) FOR UPDATE` para evitar race conditions.

---

## 🟢 5. Funcionalidades Nuevas Sugeridas

### TASK-FEAT-01 — Endpoint `PATCH /reservas/{id}/completar`
Marcar reservas como completadas y registrar el pago del saldo pendiente (90%).

### TASK-FEAT-02 — Endpoint para que el proveedor gestione sus reservas
`GET /proveedor/mis-reservas` — actualmente solo existe la vista del cliente.

### TASK-FEAT-03 — Soft-delete en servicios y paquetes del proveedor
Agregar `deleted_at` a las queries de catálogo para que los ítems eliminados no aparezcan en las búsquedas públicas.

### TASK-FEAT-04 — Email real en notificaciones
`notificacion_service.py` solo registra notificaciones en la BD como `PUSH`, pero nunca envía un email real. Implementar con un servicio de email (SendGrid, Amazon SES, etc.).

### TASK-FEAT-05 — Rate limiting en endpoints públicos
Los endpoints públicos (login, registro, chat IA) no tienen rate limiting. Agregar middleware como `slowapi` para prevenir abuso.

---

## Resumen por responsable

| Área | Tareas | Prioridad máxima |
|---|---|---|
| **Seguridad** | SEC-01, SEC-02, SEC-03, SEC-04 | 🔴 Crítico |
| **Tests** | TEST-01 a TEST-06 | 🔴 Crítico |
| **Lógica de negocio** | BIZ-01 a BIZ-07 | 🟠 Alto |
| **Calidad de código** | QA-01 a QA-04 | 🟡 Medio |
| **Funcionalidades nuevas** | FEAT-01 a FEAT-05 | 🟢 Bajo |
