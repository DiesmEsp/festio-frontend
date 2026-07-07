import { requestAuthJson } from "./apiClient";
import type { ComprobantePagoResponse, IniciarPagoPayload, IniciarPagoResponse } from "../types";

export const pagosService = {
  async iniciarPago(payload: IniciarPagoPayload): Promise<IniciarPagoResponse> {
    return requestAuthJson<IniciarPagoResponse>("/api/pagos/iniciar", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async fetchComprobante(reservaId: number): Promise<ComprobantePagoResponse> {
    return requestAuthJson<ComprobantePagoResponse>(`/api/pagos/comprobante/${reservaId}`, {
      method: "GET",
    });
  },
};
