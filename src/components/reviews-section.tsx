import { useState, useEffect, type FormEvent, type KeyboardEvent } from "react";
import { Star, Loader2, MessageSquare, X, Pencil, AlertCircle } from "lucide-react";
import { fetchResenas, crearResena, updateResena } from "../api";
import { useAuth } from "../hooks/useAuth";
import type { ResenaPublicaOut } from "../types";

type ReviewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  proveedorId: number;
};

export function ReviewsModal({ isOpen, onClose, proveedorId }: ReviewsModalProps) {
  const [resenas, setResenas] = useState<ResenaPublicaOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCalificacion, setEditCalificacion] = useState(5);
  const [editComentario, setEditComentario] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { isAuthenticated, openAuthModal, user } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setEditingId(null);
      setErrorMsg(null);
      return;
    }
    setLoading(true);
    fetchResenas(proveedorId)
      .then(setResenas)
      .catch((err) => console.error("Error cargando reseñas:", err))
      .finally(() => setLoading(false));
  }, [isOpen, proveedorId]);

  const submitReview = async () => {
    if (!comentario.trim()) return;

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);
      const nueva = await crearResena({
        proveedor_id: proveedorId,
        calificacion,
        comentario: comentario.trim(),
      });
      setResenas([nueva, ...resenas]);
      setComentario("");
      setCalificacion(5);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al enviar reseña";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (resena: ResenaPublicaOut) => {
    setEditingId(resena.id);
    setEditCalificacion(resena.calificacion);
    setEditComentario(resena.comentario ?? "");
    setErrorMsg(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setErrorMsg(null);
  };

  const saveEdit = async (resenaId: number) => {
    if (!editComentario.trim() && editCalificacion === 0) return;

    try {
      setSavingEdit(true);
      setErrorMsg(null);
      const payload: { calificacion?: number; comentario?: string } = {};
      if (editCalificacion !== 0) payload.calificacion = editCalificacion;
      if (editComentario.trim()) payload.comentario = editComentario.trim();

      const updated = await updateResena(resenaId, payload);
      setResenas(resenas.map((r) => (r.id === resenaId ? updated : r)));
      setEditingId(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al editar reseña";
      setErrorMsg(msg);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitReview();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submitReview();
    }
  };

  const handleBackdropKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      if (editingId) {
        cancelEditing();
      } else {
        onClose();
      }
    }
  };

  const parseLocalDate = (iso: string): Date => {
    const [datePart] = iso.split("T");
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const isOwnReview = (resena: ResenaPublicaOut) => {
    if (!user || !isAuthenticated) return false;
    if (resena.usuario_id != null && resena.usuario_id === user.id) return true;
    const userName = `${user.nombre} ${user.apellido ?? ""}`.trim().toLowerCase();
    const reviewName = (resena.nombre_usuario ?? "").toLowerCase();
    return reviewName.includes(user.nombre.toLowerCase()) || reviewName === userName;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reseñas de clientes"
      onKeyDown={handleBackdropKeyDown}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare size={18} className="text-purple-600" />
            Reseñas de clientes
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 shrink-0">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            <span className="flex-1">{errorMsg}</span>
            <button
              onClick={() => setErrorMsg(null)}
              className="p-0.5 rounded text-red-400 hover:text-red-600 hover:bg-red-100 shrink-0"
              aria-label="Cerrar error"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
          <form className="review-form-modal" onSubmit={handleSubmit}>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${star <= calificacion ? "active" : ""}`}
                  onClick={() => setCalificacion(star)}
                >
                  <Star size={16} fill={star <= calificacion ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            <div className="review-input-group">
              <textarea
                placeholder="Escribe tu reseña y presiona Enter..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={submitting}
                rows={2}
              />
              <button
                type="submit"
                disabled={submitting || !comentario.trim()}
                className="submit-review-btn"
              >
                {submitting ? <Loader2 size={14} className="spin" /> : "Enviar"}
              </button>
            </div>
          </form>

          <div className="reviews-list-modal">
            {loading ? (
              <div className="reviews-loading">Cargando reseñas...</div>
            ) : resenas.length === 0 ? (
              <div className="reviews-empty">Aún no hay reseñas para este proveedor.</div>
            ) : (
              resenas.map((r) => (
                <div key={r.id} className="review-item">
                  {editingId === r.id ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`star-btn ${star <= editCalificacion ? "active" : ""}`}
                            onClick={() => setEditCalificacion(star)}
                          >
                            <Star size={16} fill={star <= editCalificacion ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="w-full border border-slate-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-purple-400"
                        rows={2}
                        value={editComentario}
                        onChange={(e) => setEditComentario(e.target.value)}
                        disabled={savingEdit}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 rounded-lg transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEdit(r.id)}
                          disabled={savingEdit || (!editComentario.trim() && editCalificacion === 0)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {savingEdit ? <Loader2 size={12} className="spin inline" /> : "Guardar"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="review-header">
                        <span className="review-author">{r.nombre_usuario}</span>
                        <div className="flex items-center gap-2">
                          {isOwnReview(r) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(r);
                              }}
                              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors border border-purple-200"
                              aria-label="Editar mi reseña"
                            >
                              <Pencil size={12} />
                              Editar
                            </button>
                          )}
                          <span className="review-date">
                            {parseLocalDate(r.fecha).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < r.calificacion ? "#eab308" : "none"}
                            color={i < r.calificacion ? "#eab308" : "#cbd5e1"}
                          />
                        ))}
                      </div>
                      {r.comentario && <p className="review-text">{r.comentario}</p>}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
