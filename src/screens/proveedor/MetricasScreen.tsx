import { useEffect, useState } from "react";
import { Star, Award, MessageSquare } from "lucide-react";
import { proveedorService } from "../../services/proveedorService";
import type { MarketAnalyticsOut } from "../../types";

export function MetricasScreen() {
  const [data, setData] = useState<MarketAnalyticsOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const analytics = await proveedorService.getMiMarketAnalytics();
        setData(analytics);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cargar analytics");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const parseLocalDate = (iso: string): Date => {
    const [datePart] = iso.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDate = (iso: string) => {
    const d = parseLocalDate(iso);
    const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return d.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
  };

  if (loading) return <div className="text-slate-500">Cargando analytics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Market Analytics</h2>
          <p className="text-slate-500 mt-1">Review your service performance and customer satisfaction.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Panel de Calificación */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 flex flex-col justify-center items-center text-center">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 w-full text-left">Market Rating</h3>
          <div className="p-4 bg-yellow-50 rounded-full mb-4">
            <Star size={40} className="text-yellow-400 fill-current" />
          </div>
          <h3 className="text-5xl font-bold text-slate-900">
            {data.calificacion_promedio.toFixed(1)} <span className="text-xl text-slate-400">/ 5</span>
          </h3>
          <p className="text-xs text-slate-400 mt-2 font-medium">Based on {data.total_resenas} verified reviews</p>
          <div className="flex mt-3 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={20}
                className={i <= Math.round(data.calificacion_promedio) ? "text-yellow-400 fill-current" : "text-slate-200"}
              />
            ))}
          </div>

          {data.total_resenas > 0 && (
            <div className="w-full mt-6 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = data.distribucion_estrellas[star] ?? 0;
                const pct = data.total_resenas > 0 ? Math.round((count / data.total_resenas) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-slate-500 font-medium text-right">{star}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-slate-400 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Productos / Paquetes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Award size={18} className="text-purple-600" />
            Top 3 Best Selling Packages
          </h3>

          {data.top_paquetes.length === 0 ? (
            <p className="text-sm text-slate-400">No hay paquetes con ventas registradas aún.</p>
          ) : (
            <div className="space-y-6">
              {data.top_paquetes.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-700">{item.nombre}</span>
                    <span className="text-slate-400 text-xs">{item.ventas} ventas</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reseñas Recientes */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
          <MessageSquare size={18} className="text-purple-600" />
          Recent Customer Reviews
        </h3>

        {data.resenas_recientes.length === 0 ? (
          <p className="text-sm text-slate-400">Aún no hay reseñas de clientes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.resenas_recientes.map((resena) => (
              <div key={resena.id} className="p-5 border border-slate-100/60 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm text-slate-900">{resena.cliente_nombre}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {formatDate(resena.fecha)}
                  </span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className={i <= resena.calificacion ? "text-yellow-400 fill-current" : "text-slate-200"} />
                  ))}
                </div>
                <p className="text-sm text-slate-500 italic leading-relaxed">
                  {resena.comentario ? `"${resena.comentario}"` : "Sin comentario."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
