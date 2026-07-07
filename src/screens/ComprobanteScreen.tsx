import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Home, Loader2, ReceiptText } from "lucide-react";
import { pagosService } from "../services/pagosService";
import { money } from "../lib/format";
import type { ComprobantePagoResponse } from "../types";

export function ComprobanteScreen() {
  const { reserva_id } = useParams<{ reserva_id: string }>();
  const navigate = useNavigate();
  const [comprobante, setComprobante] = useState<ComprobantePagoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reserva_id) return;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await pagosService.fetchComprobante(Number(reserva_id));
        setComprobante(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar el comprobante.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [reserva_id]);

  if (loading) {
    return (
      <main className="success-screen">
        <section className="success-card">
          <Loader2 className="spin" size={32} />
          <p>Cargando comprobante...</p>
        </section>
      </main>
    );
  }

  if (error || !comprobante) {
    return (
      <main className="success-screen">
        <section className="success-card">
          <div className="status-icon status-icon--error">
            <ReceiptText size={34} />
          </div>
          <h1>Comprobante no disponible</h1>
          <p>{error ?? "No se encontro el comprobante solicitado."}</p>
          <div className="success-actions">
            <button className="primary-action" type="button" onClick={() => navigate("/chat")}>
              <Home size={18} />
              Volver al inicio
            </button>
          </div>
        </section>
      </main>
    );
  }

  const fechaPago = new Date(comprobante.fecha_pago).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const horaPago = new Date(comprobante.fecha_pago).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="success-screen">
      <section className="success-card">
        <div className="success-icon">
          <ReceiptText size={34} />
        </div>
        <span>Comprobante de pago</span>
        <h1>{comprobante.nombre_evento}</h1>
        <p>{comprobante.nombre_empresa}</p>

        <div className="reservation-banner">
          <ReceiptText size={22} />
          <div>
            <small>Comprobante FEST-{comprobante.pago_id}</small>
            <strong>{fechaPago} · {horaPago}</strong>
          </div>
        </div>

        <div className="receipt-card">
          <div className="receipt-header">
            <ReceiptText size={16} />
            Detalle del pago
          </div>
          <div className="receipt-body">
            <div className="receipt-row">
              <span>Estado</span>
              <strong className={comprobante.estado === "COMPLETADO" ? "text-green" : "text-muted"}>
                {comprobante.estado}
              </strong>
            </div>
            <div className="receipt-row">
              <span>Metodo de pago</span>
              <strong>{comprobante.metodo_pago}</strong>
            </div>
            <hr className="receipt-divider" />
            <div className="receipt-row receipt-total">
              <span>Total</span>
              <strong>{money.format(comprobante.monto_total)}</strong>
            </div>
            <div className="receipt-row receipt-green">
              <span>Adelanto pagado</span>
              <strong>{money.format(comprobante.monto_adelanto)}</strong>
            </div>
            <div className="receipt-row receipt-orange">
              <span>Saldo en local</span>
              <strong>{money.format(comprobante.monto_pendiente)}</strong>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button className="primary-action" type="button" onClick={() => navigate("/chat")}>
            <Home size={18} />
            Volver al inicio
          </button>
          <button className="outline-action" type="button" onClick={() => navigate("/chat")}>
            <Calendar size={18} />
            Mis reservas
          </button>
        </div>
      </section>
    </main>
  );
}
