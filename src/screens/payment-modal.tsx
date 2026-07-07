import { useState } from "react";
import { CreditCard, Loader2, X, CheckCircle } from "lucide-react";
import { PaymentMethodSelect } from "../components/payment-method-select";
import { money } from "../lib/format";
import type { AuthUser, PreReservaResponse } from "../types";

type PaymentModalProps = {
  preReserva: PreReservaResponse;
  user: AuthUser;
  loadingPayment: boolean;
  error: string | null;
  onConfirm: (metodoPago: string) => void;
  onClose: () => void;
};

export function PaymentModal({
  preReserva,
  user,
  loadingPayment,
  error,
  onConfirm,
  onClose,
}: PaymentModalProps) {
  const [metodoPago, setMetodoPago] = useState("TARJETA");

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <button className="close-button" type="button" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-head">
          <span>Confirma tu reserva</span>
          <h2 id="payment-title">Adelanto a pagar: {money.format(preReserva.monto_adelanto)}</h2>
          <p>El saldo de {money.format(preReserva.monto_pendiente)} se paga en el local.</p>
        </div>

        {error && <p className="inline-error">{error}</p>}

        <div className="auth-form">
          <div className="auth-user-summary">
            <div className="auth-user-avatar">
              {(user.nombre.charAt(0) || "C").toUpperCase()}
            </div>
            <div className="auth-user-details">
              <strong>{user.nombre} {user.apellido}</strong>
              <span><CheckCircle size={12} style={{ display: "inline", verticalAlign: "middle" }} /> Sesion activa</span>
            </div>
          </div>

          <PaymentMethodSelect
            value={metodoPago}
            onChange={setMetodoPago}
          />

          <button
            className="primary-action wide-field"
            type="button"
            disabled={loadingPayment}
            onClick={() => onConfirm(metodoPago)}
          >
            {loadingPayment ? <Loader2 className="spin" size={18} /> : <CreditCard size={18} />}
            Ir a pagar con Mercado Pago
          </button>
        </div>
      </section>
    </div>
  );
}

