import { useState, useEffect } from "react";
import { Filter, Check, Building2, Tags, X, Loader2 } from "lucide-react";
import { listarProveedores, listarCategorias } from "../api";
import type { Categoria, ChatFilters, ProveedorPerfil } from "../types";

type FilterPanelProps = {
  filters: ChatFilters;
  onChange: (filters: ChatFilters) => void;
};

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [proveedores, setProveedores] = useState<ProveedorPerfil[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && proveedores.length === 0 && categorias.length === 0) {
      setLoading(true);
      setError(null);
      Promise.all([listarProveedores(), listarCategorias()])
        .then(([provData, catData]) => {
          setProveedores(provData);
          setCategorias(catData);
        })
        .catch((err) => {
          console.error("Error cargando filtros:", err);
          setError("No se pudieron cargar los filtros.");
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, proveedores.length, categorias.length]);

  const toggleProveedor = (id: number) => {
    const nextIds = filters.proveedor_ids.includes(id)
      ? filters.proveedor_ids.filter((fid) => fid !== id)
      : [...filters.proveedor_ids, id];
    onChange({ ...filters, proveedor_ids: nextIds });
  };

  const toggleCategoria = (id: number) => {
    const nextIds = filters.categoria_ids.includes(id)
      ? filters.categoria_ids.filter((fid) => fid !== id)
      : [...filters.categoria_ids, id];
    onChange({ ...filters, categoria_ids: nextIds });
  };

  const clearFilters = () => {
    onChange({ proveedor_ids: [], categoria_ids: [] });
  };

  const activeCount = filters.proveedor_ids.length + filters.categoria_ids.length;

  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  const selectedProveedores = proveedores.filter((p) => filters.proveedor_ids.includes(p.id));
  const selectedCategorias = categorias.filter((c) => filters.categoria_ids.includes(c.id));

  return (
    <div className="filter-panel-wrapper">
      <button
        type="button"
        className={`filter-toggle-btn ${activeCount > 0 ? "active" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <Filter size={16} />
        <span>Filtros {activeCount > 0 && `(${activeCount})`}</span>
      </button>

      {activeCount > 0 && (
        <div className="filter-active-summary">
          {selectedCategorias.map((cat) => (
            <button
              key={`sel-cat-${cat.id}`}
              type="button"
              className="filter-chip active"
              onClick={() => toggleCategoria(cat.id)}
            >
              <Check size={12} />
              {cat.nombre}
              <X size={10} className="ml-0.5" />
            </button>
          ))}
          {selectedProveedores.map((prov) => (
            <button
              key={`sel-prov-${prov.id}`}
              type="button"
              className="filter-chip active"
              onClick={() => toggleProveedor(prov.id)}
            >
              <Check size={12} />
              {prov.nombre_empresa}
              <X size={10} className="ml-0.5" />
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de búsqueda"
          onKeyDown={handleBackdropKeyDown}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col z-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter size={18} className="text-purple-600" />
                Filtrar resultados
              </h3>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button type="button" onClick={clearFilters} className="text-xs font-medium text-red-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
                    Limpiar todo
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Cargando filtros...
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500 text-sm">{error}</div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      <Tags size={14} className="text-purple-500" />
                      Categorías
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categorias.map((cat) => {
                        const active = filters.categoria_ids.includes(cat.id);
                        return (
                          <button
                            key={`cat-${cat.id}`}
                            type="button"
                            className={`filter-chip ${active ? "active" : ""}`}
                            onClick={() => toggleCategoria(cat.id)}
                          >
                            {active && <Check size={12} />}
                            {cat.nombre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      <Building2 size={14} className="text-purple-500" />
                      Proveedores
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {proveedores.map((prov) => {
                        const active = filters.proveedor_ids.includes(prov.id);
                        return (
                          <button
                            key={`prov-${prov.id}`}
                            type="button"
                            className={`filter-chip ${active ? "active" : ""}`}
                            onClick={() => toggleProveedor(prov.id)}
                          >
                            {active && <Check size={12} />}
                            {prov.nombre_empresa}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end px-6 py-4 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
