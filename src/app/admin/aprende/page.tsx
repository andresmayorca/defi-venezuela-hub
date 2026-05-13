"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";

interface Track {
  id: string;
  title: string;
  slug: string;
  emoji: string;
  level: string;
  duration: string;
  lessons: number;
  description: string;
  published: boolean;
  created_at: string;
}

const empty = { title: "", slug: "", emoji: "📚", level: "Principiante", duration: "", lessons: 0, description: "", topics: "", published: false };

export default function AdminAprendePage() {
  const [items, setItems] = useState<Track[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => { load(); }, []);
  async function load() {
    const { data } = await supabase.from("aprende_tracks").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  }

  async function save() {
    setSaving(true);
    const payload = { ...form, lessons: Number(form.lessons), topics: form.topics.split("\n").filter(Boolean) };
    if (editId) { await supabase.from("aprende_tracks").update(payload).eq("id", editId); }
    else { await supabase.from("aprende_tracks").insert(payload); }
    await load(); setSaving(false); setModal(false); setForm(empty); setEditId(null);
  }

  async function toggle(id: string, published: boolean) { await supabase.from("aprende_tracks").update({ published }).eq("id", id); await load(); }
  async function del(id: string) { if (!confirm("¿Eliminar?")) return; await supabase.from("aprende_tracks").delete().eq("id", id); await load(); }
  async function notify(item: Track) {
    if (!confirm(`¿Notificar sobre "${item.title}"?`)) return;
    await fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "" }, body: JSON.stringify({ section: "aprende", title: item.title, url: `/aprende/${item.slug}` }) });
    alert("Notificaciones enviadas ✓");
  }

  function openEdit(item: Track) {
    setForm({ title: item.title, slug: item.slug, emoji: item.emoji, level: item.level, duration: item.duration, lessons: item.lessons, description: item.description, topics: "", published: item.published });
    setEditId(item.id); setModal(true);
  }

  const levels = ["Principiante", "Intermedio", "Avanzado"];
  const levelColors: Record<string, string> = { Principiante: "text-green-400", Intermedio: "text-[#00FF88]", Avanzado: "text-orange-400" };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#F0F1F5]">Aprende — Tracks</h1>
        <button onClick={() => { setForm(empty); setEditId(null); setModal(true); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm hover:bg-[#00e67a] transition-colors">+ Nuevo track</button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-[#9DA5B4]/40"><p className="text-4xl mb-3">🎓</p><p>No hay tracks.</p></div>
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-[#161B24] border-b border-white/5">
              <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Track</th>
              <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Nivel</th>
              <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Lecciones</th>
              <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Estado</th>
              <th className="text-right px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Acciones</th>
            </tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-[#F0F1F5] font-medium">{item.emoji} {item.title}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${levelColors[item.level] ?? "text-[#9DA5B4]"}`}>{item.level}</span></td>
                  <td className="px-4 py-3 text-[#9DA5B4]">{item.lessons}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.published ? "bg-green-400/10 text-green-400" : "bg-[#9DA5B4]/10 text-[#9DA5B4]/60"}`}>{item.published ? "Publicado" : "Borrador"}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggle(item.id, !item.published)} className="text-xs px-2 py-1 rounded-lg border border-white/10 text-[#9DA5B4]/60 hover:text-[#F0F1F5] transition-all">{item.published ? "Despublicar" : "Publicar"}</button>
                      {item.published && <button onClick={() => notify(item)} className="text-xs px-2 py-1 rounded-lg border border-cyan-400/20 text-cyan-400/70 hover:text-cyan-400 transition-all">Notificar</button>}
                      <button onClick={() => openEdit(item)} className="text-xs px-2 py-1 rounded-lg border border-white/10 text-[#9DA5B4]/60 hover:text-[#F0F1F5] transition-all">Editar</button>
                      <button onClick={() => del(item.id)} className="text-xs px-2 py-1 rounded-lg border border-red-400/20 text-red-400/60 hover:text-red-400 transition-all">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#161B24] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#F0F1F5]">{editId ? "Editar track" : "Nuevo track"}</h2>
              <button onClick={() => setModal(false)} className="text-[#9DA5B4]/60 hover:text-[#F0F1F5]"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[{ key: "emoji", label: "Emoji" }, { key: "title", label: "Título" }, { key: "slug", label: "Slug" }, { key: "duration", label: "Duración (ej: 4 horas)" }].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
                  <input value={(form as Record<string, unknown>)[f.key] as string} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Nivel</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors">
                    {levels.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Lecciones</label>
                  <input type="number" value={form.lessons} onChange={(e) => setForm({ ...form, lessons: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Descripción</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors resize-none" />
              </div>
              <div>
                <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Topics (uno por línea)</label>
                <textarea rows={4} value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-5 rounded-full transition-colors ${form.published ? "bg-[#00FF88]" : "bg-[#9DA5B4]/20"}`} onClick={() => setForm({ ...form, published: !form.published })}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow mt-0.5 transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-[#9DA5B4]">Publicar</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-[#9DA5B4] text-sm">Cancelar</button>
              <button onClick={save} disabled={saving} className="flex-1 px-4 py-2.5 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm disabled:opacity-60">{saving ? "Guardando..." : "Guardar"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
