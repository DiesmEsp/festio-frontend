import { useSearchParams } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw, XCircle } from "lucide-react";

function useMercadoPagoParams() {
  const [searchParams] = useSearchParams();
  return {
    paymentId: searchParams.get("payment_id"),
    status: searchParams.get("status"),
    externalReference: searchParams.get("external_reference"),
  };
}

export function PagoFallidoScreen() {
  const params = useMercadoPagoParams();

  return (
    <main className="success-screen">
      <section className="success-card">
        <div className="status-icon status-icon--error">
          <XCircle size={34} />
        </div>
        <span>Pago rechazado</span>
        <h1>No se pudo procesar el pago</h1>
        <p>
          El pago fue rechazado por Mercado Pago. Puedes intentar nuevamente
          o elegir otro metodo de pago desde el chat.
        </p>

        {params.paymentId && (
          <div className="status-banner status-banner--error">
            <AlertTriangle size={20} />
            <div>
              <small>Referencia</small>
              <strong>{params.paymentId}</strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button className="primary-action" type="button" onClick={() => window.location.href = "/chat"}>
            <Home size={18} />
            Volver al inicio
          </button>
          <button className="outline-action" type="button" onClick={() => window.location.href = "/chat"}>
            <RefreshCw size={18} />
            Intentar de nuevo
          </button>
        </div>
      </section>
    </main>
  );
}
