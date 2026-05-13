"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, Send, Eye, EyeOff } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface ContentTableProps<T extends { id: string; published?: boolean; title?: string; name?: string }> {
  title: string;
  items: T[];
  columns: Column<T>[];
  section: string;
  onDelete: (id: string) => Promise<void>;
  onTogglePublish: (id: string, published: boolean) => Promise<void>;
  onNotify: (id: string) => Promise<void>;
  onNew: () => void;
  onEdit: (item: T) => void;
}

export default function ContentTable<T extends { id: string; published?: boolean; title?: string; name?: string }>({
  title,
  items,
  columns,
  section,
  onDelete,
  onTogglePublish,
  onNotify,
  onNew,
  onEdit,
}: ContentTableProps<T>) {
  const [notifying, setNotifying] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este elemento?")) return;
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
  }

  async function handleNotify(item: T) {
    const label = (item.title ?? item.name ?? "Nuevo contenido");
    if (!confirm(`¿Enviar notificación a todos los suscriptores sobre "${label}"?`)) return;
    setNotifying(item.id);
    await onNotify(item.id);
    setNotifying(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#F0F1F5]">{title}</h1>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm hover:bg-[#00e67a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-[#9DA5B4]/40">
          <p className="text-4xl mb-3">📭</p>
          <p>No hay elementos aún. Crea el primero.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-[#161B24]">
                {columns.map((col) => (
                  <th key={String(col.key)} className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-[#9DA5B4]">
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[String(col.key)] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {/* Publish toggle */}
                      <button
                        onClick={() => onTogglePublish(item.id, !item.published)}
                        className={`p-1.5 rounded-lg transition-all ${
                          item.published
                            ? "text-[#00FF88] bg-[#00FF88]/10 hover:bg-[#00FF88]/20"
                            : "text-[#9DA5B4]/40 hover:text-[#9DA5B4] hover:bg-white/5"
                        }`}
                        title={item.published ? "Despublicar" : "Publicar"}
                      >
                        {item.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      {/* Notify */}
                      {item.published && (
                        <button
                          onClick={() => handleNotify(item)}
                          disabled={notifying === item.id}
                          className="p-1.5 rounded-lg text-[#9DA5B4]/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all disabled:opacity-40"
                          title="Notificar suscriptores"
                        >
                          {notifying === item.id
                            ? <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin block" />
                            : <Send className="w-3.5 h-3.5" />
                          }
                        </button>
                      )}

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-lg text-[#9DA5B4]/40 hover:text-[#F0F1F5] hover:bg-white/5 transition-all"
                        title="Editar"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleting === item.id}
                        className="p-1.5 rounded-lg text-[#9DA5B4]/40 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
