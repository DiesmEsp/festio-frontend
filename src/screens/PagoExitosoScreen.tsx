import { useSearchParams } from "react-router-dom";
import { CheckCircle2, ExternalLink, Home, ReceiptText } from "lucide-react";

function useMercadoPagoParams() {
  const [searchParams] = useSearchParams();
  return {
    paymentId: searchParams.get("payment_id"),
    status: searchParams.get("status"),
    externalReference: searchParams.get("external_reference"),
    merchantOrderId: searchParams.get("merchant_order_id"),
    preferenceId: searchParams.get("preference_id"),
  };
}

export function PagoExitosoScreen() {
  const params = useMercadoPagoParams();

  const title = params.status === "approved"
    ? "Pago confirmado"
    : "Reserva en proceso";

  const subtitle = params.status === "approved"
    ? "Tu pago fue procesado exitosamente. El proveedor ya puede ver tu reserva."
    : "Estamos verificando tu pago. Te notificaremos cuando se confirme.";

  return (
    <main className="success-screen">
      <section className="success-card">
        <div className="success-icon">
          <CheckCircle2 size={34} />
        </div>
        <span>Mercado Pago</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>

        {params.paymentId && (
          <div className="reservation-banner">
            <ReceiptText size={22} />
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
          <button className="outline-action" type="button" onClick={() => window.location.href = "/chat"}>
            <ExternalLink size={18} />
            Ver mis reservas
          </button>
        </div>
      </section>
    </main>
  );
}
