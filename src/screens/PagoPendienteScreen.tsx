import { useSearchParams } from "react-router-dom";
import { Clock, Home } from "lucide-react";

function useMercadoPagoParams() {
  const [searchParams] = useSearchParams();
  return {
    paymentId: searchParams.get("payment_id"),
    status: searchParams.get("status"),
  };
}

export function PagoPendienteScreen() {
  const params = useMercadoPagoParams();

  return (
    <main className="success-screen">
      <section className="success-card">
        <div className="status-icon status-icon--pending">
          <Clock size={34} />
        </div>
        <span>Pago pendiente</span>
        <h1>Tu pago esta siendo procesado</h1>
        <p>
          El pago esta pendiente de confirmacion por Mercado Pago.
          Esto puede tomar unos minutos con algunos metodos de pago.
        </p>

        {params.paymentId && (
          <div className="status-banner status-banner--pending">
            <Clock size={20} />
            <div>
              <small>ID de pago</small>
              <strong>{params.paymentId}</strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button className="primary-action" type="button" onClick={() => window.location.href = "/chat"}>
            <Home size={18} />
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  );
}
