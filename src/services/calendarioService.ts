import { requestAuthJson } from "./apiClient";
import type { BloqueoCalendario } from "../types";


export const calendarioService = {
  async listar(): Promise<BloqueoCalendario[]> {
    return requestAuthJson<BloqueoCalendario[]>("/api/proveedor/calendario/bloqueos", {
      method: "GET",
    });
  },

  async crear(datos: { fecha: string; motivo?: string | null }): Promise<BloqueoCalendario> {
    return requestAuthJson<BloqueoCalendario>("/api/proveedor/calendario/bloqueos", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  },

  async eliminar(fecha: string): Promise<void> {
    return requestAuthJson<void>(`/api/proveedor/calendario/bloqueos/${encodeURIComponent(fecha)}`, {
      method: "DELETE",
    });
  },
};
