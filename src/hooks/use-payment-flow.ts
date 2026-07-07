import { useState } from "react";
import { prebloquearReserva } from "../api";
import { pagosService } from "../services/pagosService";
import {
  cleanNumber,
  inferEventType,
  readError,
} from "../lib/format";
import type {
  CheckoutReservaResponse,
  EventDraft,
  PreReservaResponse,
  ProveedorRecomendado,
  ServicioProducto,
} from "../types";

export type ContinueToPaymentParams = {
  provider: ProveedorRecomendado;
  eventDraft: EventDraft;
  endDateTime: string;
  selectedExtras: ServicioProducto[];
  extraQuantities: Record<number, number>;
};

/**
 * Manages the full payment flow: pre-reserva and the simulated checkout.
 * Auth is handled externally by AuthProvider/AuthModal before this flow starts.
 */
export function usePaymentFlow({ onSuccess }: { onSuccess: () => void }) {
  const [preReserva, setPreReserva] = useState<PreReservaResponse | null>(null);
  const [confirmation, setConfirmation] = useState<CheckoutReservaResponse | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function continueToPayment(params: ContinueToPaymentParams) {
    const { provider, eventDraft, endDateTime, selectedExtras, extraQuantities } = params;

    if (!eventDraft.fecha || !eventDraft.horaInicio || !eventDraft.direccion.trim()) {
      setError("Selecciona fecha, hora de inicio y dirección del cliente.");
      return;
    }
    if (!endDateTime) {
      setError("No se pudo calcular la hora de fin.");
      return;
    }

    setLoadingPayment(true);
    setError(null);

    try {
      const response = await prebloquearReserva({
        proveedor_id: provider.proveedor_id,
        paquete_id: provider.paquete.paquete_id,
        nombre_evento: provider.paquete.nombre,
        tipo_evento: inferEventType(provider),
        fecha_evento_inicio: `${eventDraft.fecha}T${eventDraft.horaInicio}:00`,
        fecha_evento_fin: endDateTime,
        direccion: eventDraft.direccion.trim(),
        aforo_estimado: cleanNumber(eventDraft.invitados) ?? null,
        adicionales: selectedExtras.map((service) => ({
          servicio_producto_id: service.id,
          cantidad: extraQuantities[service.id] ?? 0,
          horas_contratadas: service.duracion_base_horas ?? null,
        })),
      });
      setPreReserva(response);
      setPaymentOpen(true);
    } catch (apiError) {
      setError(readError(apiError));
    } finally {
      setLoadingPayment(false);
    }
  }

  async function iniciarPagoMP(params: {
    tituloEvento: string;
    metodoPago: string;
  }) {
    if (!preReserva) return;

    setLoadingPayment(true);
    setError(null);

    try {
      const response = await pagosService.iniciarPago({
        tipo_pago: "ADELANTO_ONLINE",
        monto: preReserva.monto_adelanto,
        metodo_pago: params.metodoPago,
        titulo_evento: params.tituloEvento,
        reserva_temp_id: preReserva.reserva_temp_id,
        codigo_transaccion: null,
      });

      setPaymentOpen(false);
      window.location.href = response.url_pago;
    } catch (apiError) {
      setError(readError(apiError));
    } finally {
      setLoadingPayment(false);
    }
  }

  async function submitPayment(
    direccion: string,
    metodoPago: string,
  ) {
    iniciarPagoMP({
      tituloEvento: "",
      metodoPago,
    });
  }

  return {
    preReserva,
    confirmation,
    paymentOpen,
    setPaymentOpen,
    loadingPayment,
    error,
    continueToPayment,
    iniciarPagoMP,
    submitPayment,
  };
}

