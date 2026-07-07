import { useEffect, useState } from "react";
import { ClipboardCheck, MapPin, CalendarClock, Loader2, AlertTriangle } from "lucide-react";
import { reservaProveedorService } from "../../services/reservaProveedorService";
import { money } from "../../lib/format";
import type { ProveedorReservaItem } from "../../types";

export function OperacionesScreen() {
  const [reservas, setReservas] = useState<ProveedorReservaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completandoId, setCompletandoId] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    reservaProveedorService
      .getMisReservas()
      .then((data) => {
        if (mounted) setReservas(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message ?? "Error al cargar reservas");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleCompletar = async (reservaId: number) => {
    setCompletandoId(reservaId);
    try {
      await reservaProveedorService.completarReserva(reservaId);
      setReservas((prev) =>
        prev.map((r) => (r.reserva_id === reservaId ? { ...r, estado: "COMPLETADA" } : r)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "No se pudo completar la reserva.");
    } finally {
      setCompletandoId(null);
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "PENDIENTE": return "bg-slate-100 text-slate-600 border border-slate-200/60";
      case "CONFIRMADA": return "bg-orange-100 text-orange-600 border border-orange-200";
      case "COMPLETADA": return "bg-emerald-100 text-emerald-600 border border-emerald-200";
      case "CANCELADA": return "bg-red-100 text-red-600 border border-red-200";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-slate-500">
        <Loader2 className="animate-spin" size={32} />
        <p>Cargando tus reservas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-slate-500">
        <AlertTriangle size={32} className="text-red-400" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Operaciones y Reservas
          </h2>
          <p className="text-slate-500 mt-1">
            Gestiona el estado de tus reservas confirmadas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map((reserva) => (
          <div
            key={reserva.reserva_id}
            className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-50 flex-1 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Reserva #{reserva.reserva_id}
                  </span>
                  <h3 className="font-bold text-slate-900 leading-tight mt-1">
                    {reserva.nombre_evento}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{reserva.nombre_cliente}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(reserva.estado)}`}>
                  {reserva.estado}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-slate-500">
                <div className="flex items-center gap-2.5">
                  <CalendarClock size={16} className="text-slate-400" />
                  <span>{reserva.fecha_evento_inicio.replace("T", " ")}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="truncate">{reserva.direccion}</span>
                </div>
              </div>

              <div className="pt-2 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total</span>
                  <strong>{money.format(reserva.monto_total)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saldo pendiente</span>
                  <strong className={reserva.monto_pendiente > 0 ? "text-orange-600" : "text-emerald-600"}>
                    {money.format(reserva.monto_pendiente)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 pt-0">
              {reserva.estado === "CONFIRMADA" && (
                <button
                  onClick={() => handleCompletar(reserva.reserva_id)}
                  disabled={completandoId === reserva.reserva_id}
                  className="w-full text-sm font-medium bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 hover:bg-emerald-600 disabled:opacity-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {completandoId === reserva.reserva_id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ClipboardCheck size={16} />
                  )}
                  Marcar como completada
                </button>
              )}
              {reserva.estado === "COMPLETADA" && (
                <div className="w-full text-center text-sm font-medium text-emerald-600 py-2.5 flex items-center justify-center gap-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <ClipboardCheck size={16} /> Evento Concluido
                </div>
              )}
            </div>
          </div>
        ))}

        {reservas.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100/60 shadow-sm flex flex-col justify-center items-center p-8 text-center min-h-[300px] col-span-full">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
              <ClipboardCheck size={24} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">No hay reservas todavía</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
              Las nuevas reservas confirmadas aparecerán aquí automáticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
