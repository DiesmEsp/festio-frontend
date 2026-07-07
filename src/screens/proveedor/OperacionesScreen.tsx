import { useEffect, useState } from "react";
import { ClipboardCheck, MapPin, CalendarClock, ChevronRight } from "lucide-react";
import { operacionesService } from "../../services/operacionesService";
import type { ReservaOperativa } from "../../types";

export function OperacionesScreen() {
  const [reservas, setReservas] = useState<ReservaOperativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyReservaId, setBusyReservaId] = useState<number | null>(null);

  useEffect(() => {
    loadReservas();
  }, []);

  async function loadReservas() {
    setLoading(true);
    setError(null);
    try {
      const data = await operacionesService.listar();
      setReservas(data);
    } catch (err: any) {
      setError(err.message || "No se pudieron cargar las reservas operativas");
    } finally {
      setLoading(false);
    }
  }

  async function handleEstadoChange(reserva: ReservaOperativa) {
    setBusyReservaId(reserva.reserva_id);
    setError(null);
    try {
      let updated: ReservaOperativa;
      if (reserva.puede_en_camino) {
        updated = await operacionesService.marcarEnCamino(reserva.reserva_id);
      } else if (reserva.puede_iniciar_show) {
        updated = await operacionesService.iniciarShow(reserva.reserva_id);
      } else {
        updated = await operacionesService.finalizar(reserva.reserva_id);
      }

      setReservas((current) =>
        current.map((item) => (item.reserva_id === updated.reserva_id ? updated : item)),
      );
    } catch (err: any) {
      setError(err.message || "No se pudo actualizar el estado del evento");
    } finally {
      setBusyReservaId(null);
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "PENDIENTE": return "bg-slate-100 text-slate-600 border border-slate-200/60";
      case "EN_CAMINO": return "bg-orange-100 text-orange-600 border border-orange-200";
      case "EN_PROGRESO": return "bg-purple-100 text-purple-600 border border-purple-200";
      case "FINALIZADO": return "bg-emerald-100 text-emerald-600 border border-emerald-200";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  function formatDateTime(value: string) {
    return value.replace("T", " ").slice(0, 16);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Operaciones y Despacho</h2>
          <p className="text-slate-500 mt-1">Actualiza el estado operativo de cada evento: en camino, iniciar show y finalizar.</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100/60 shadow-sm p-8 text-center text-slate-500">
          Cargando eventos operativos...
        </div>
      ) : null}

      {!loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map((reserva) => (
          <div key={reserva.reserva_id} className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex-1 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">RES-{String(reserva.reserva_id).padStart(4, "0")}</span>
                  <h3 className="font-bold text-slate-900 leading-tight mt-1">{reserva.nombre_evento}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{reserva.cliente_nombre}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(reserva.estado_operativo)}`}>
                  {reserva.estado_operativo.replace(/_/g, " ")}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-slate-500">
                <div className="flex items-center gap-2.5">
                  <CalendarClock size={16} className="text-slate-400" />
                  <span>{formatDateTime(reserva.fecha_evento_inicio)}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="truncate">{reserva.direccion || "Dirección por confirmar"}</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  Estado comercial: {reserva.estado_reserva}
                </div>
              </div>
            </div>

            {/* Acciones de Cambio de Estado */}
            <div className="bg-white p-6 pt-0">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Cambiar Estado Operativo</label>
              <div className="flex gap-2 overflow-x-auto">
                {reserva.puede_en_camino && (
                  <button
                    onClick={() => void handleEstadoChange(reserva)}
                    disabled={busyReservaId === reserva.reserva_id}
                    className="flex-1 text-sm font-medium bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    {busyReservaId === reserva.reserva_id ? "Actualizando..." : "En Camino"} <ChevronRight size={16} className="text-slate-400" />
                  </button>
                )}
                {reserva.puede_iniciar_show && (
                  <button
                    onClick={() => void handleEstadoChange(reserva)}
                    disabled={busyReservaId === reserva.reserva_id}
                    className="flex-1 text-sm font-medium bg-purple-600 text-white px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/20 hover:bg-purple-700 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    {busyReservaId === reserva.reserva_id ? "Actualizando..." : "Iniciar Show"} <ChevronRight size={16} className="text-white/70" />
                  </button>
                )}
                {reserva.puede_finalizar && (
                  <button
                    onClick={() => void handleEstadoChange(reserva)}
                    disabled={busyReservaId === reserva.reserva_id}
                    className="flex-1 text-sm font-medium bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 hover:bg-emerald-600 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <ClipboardCheck size={16} /> {busyReservaId === reserva.reserva_id ? "Actualizando..." : "Finalizar"}
                  </button>
                )}
                {!reserva.puede_en_camino && !reserva.puede_iniciar_show && !reserva.puede_finalizar && (
                  <div className="w-full text-center text-sm font-medium text-emerald-600 py-2.5 flex items-center justify-center gap-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <ClipboardCheck size={16} /> Evento Concluido
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty state card similar to screenshot */}
        {reservas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100/60 shadow-sm flex flex-col justify-center items-center p-8 text-center min-h-[300px] col-span-full">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
              <ClipboardCheck size={24} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">No hay eventos operativos por mostrar</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[260px]">Las reservas confirmadas de tu empresa aparecerán aquí automáticamente para que puedas seguir su avance.</p>
          </div>
        ) : null}
      </div> : null}
    </div>
  );
}