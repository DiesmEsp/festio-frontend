import { requestAuthJson } from "./apiClient";
import type { ProveedorReservaItem } from "../types";

export const reservaProveedorService = {
  async getMisReservas(): Promise<ProveedorReservaItem[]> {
    return requestAuthJson<ProveedorReservaItem[]>("/api/proveedor/reservas/mis-reservas", {
      method: "GET",
    });
  },

  async completarReserva(
    reservaId: number,
    datos: { metodo_pago?: string; codigo_transaccion?: string } = {},
  ) {
    return requestAuthJson(`/api/reservas/${reservaId}/completar`, {
      method: "PATCH",
      body: JSON.stringify({ metodo_pago: datos.metodo_pago ?? "EFECTIVO", ...datos }),
    });
  },
};