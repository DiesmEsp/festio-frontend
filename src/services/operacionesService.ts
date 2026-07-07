import { requestAuthJson } from "./apiClient";
import type { ReservaOperativa } from "../types";


export const operacionesService = {
  async listar(): Promise<ReservaOperativa[]> {
    return requestAuthJson<ReservaOperativa[]>("/api/proveedor/reservas-operativas", {
      method: "GET",
    });
  },

  async marcarEnCamino(reservaId: number): Promise<ReservaOperativa> {
    return requestAuthJson<ReservaOperativa>(`/api/proveedor/reservas-operativas/${reservaId}/en-camino`, {
      method: "PATCH",
    });
  },

  async iniciarShow(reservaId: number): Promise<ReservaOperativa> {
    return requestAuthJson<ReservaOperativa>(`/api/proveedor/reservas-operativas/${reservaId}/iniciar-show`, {
      method: "PATCH",
    });
  },

  async finalizar(reservaId: number): Promise<ReservaOperativa> {
    return requestAuthJson<ReservaOperativa>(`/api/proveedor/reservas-operativas/${reservaId}/finalizar`, {
      method: "PATCH",
    });
  },
};
