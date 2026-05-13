"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  published: boolean;
  created_at: string;
}

const emptyPost = { title: "", slug: "", tag: "", excerpt: "", content: "", published: false };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data ?? []);
  }

  async function save() {
    setSaving(true);
    if (editId) {
      await supabase.from("blog_posts").update(form).eq("id", editId);
    } else {
      await supabase.from("blog_posts").insert(form);
    }
    await loadPosts();
    setSaving(false);
    setModal(false);
    setForm(emptyPost);
    setEditId(null);
  }

  async function togglePublish(id: string, published: boolean) {
    await supabase.from("blog_posts").update({ published }).eq("id", id);
    await loadPosts();
  }

  async function deletePost(id: string) {
    if (!confirm("¿Eliminar artículo?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    await loadPosts();
  }

  async function sendNotification(post: BlogPost) {
    if (!confirm(`¿Notificar a suscriptores sobre "${post.title}"?`)) return;
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "",
      },
      body: JSON.stringify({ section: "blog", title: post.title, url: `/blog/${post.slug}` }),
    });
    alert("Notificaciones enviadas ✓");
  }

  function openEdit(post: BlogPost) {
    setForm({ title: post.title, slug: post.slug, tag: post.tag, excerpt: post.excerpt, content: "", published: post.published });
    setEditId(post.id);
    setModal(true);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#F0F1F5]">Blog</h1>
        <button onClick={() => { setForm(emptyPost); setEditId(null); setModal(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm hover:bg-[#00e67a] transition-colors">
          + Nuevo artículo
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-[#9DA5B4]/40">
          <p className="text-4xl mb-3">📝</p>
          <p>No hay artículos. Crea el primero.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#161B24] border-b border-white/5">
                <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Título</th>
                <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Tag</th>
                <th className="text-left px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Estado</th>
                <th className="text-right px-4 py-3 text-[#9DA5B4]/60 font-semibold text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-[#F0F1F5] font-medium">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#00FF88]/10 text-[#00FF88]">{post.tag}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-400/10 text-green-400" : "bg-[#9DA5B4]/10 text-[#9DA5B4]/60"}`}>
                      {post.published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => togglePublish(post.id, !post.published)}
                        className="text-xs px-2 py-1 rounded-lg border border-white/10 text-[#9DA5B4]/60 hover:text-[#F0F1F5] hover:border-white/20 transition-all">
                        {post.published ? "Despublicar" : "Publicar"}
                      </button>
                      {post.published && (
                        <button onClick={() => sendNotification(post)}
                          className="text-xs px-2 py-1 rounded-lg border border-cyan-400/20 text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-400/40 transition-all">
                          Notificar
                        </button>
                      )}
                      <button onClick={() => openEdit(post)}
                        className="text-xs px-2 py-1 rounded-lg border border-white/10 text-[#9DA5B4]/60 hover:text-[#F0F1F5] transition-all">
                        Editar
                      </button>
                      <button onClick={() => deletePost(post.id)}
                        className="text-xs px-2 py-1 rounded-lg border border-red-400/20 text-red-400/60 hover:text-red-400 hover:border-red-400/40 transition-all">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#161B24] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#F0F1F5]">{editId ? "Editar artículo" : "Nuevo artículo"}</h2>
              <button onClick={() => setModal(false)} className="text-[#9DA5B4]/60 hover:text-[#F0F1F5]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { key: "title", label: "Título", type: "text" },
                { key: "slug", label: "Slug (URL)", type: "text" },
                { key: "tag", label: "Tag", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">{field.label}</label>
                  <input type={field.type}
                    value={(form as Record<string, unknown>)[field.key] as string}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Extracto</label>
                <textarea rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9DA5B4]/60 font-semibold mb-1.5 uppercase tracking-wider">Contenido (Markdown)</label>
                <textarea rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-sm focus:outline-none focus:border-[#00FF88]/40 transition-colors resize-none font-mono"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-5 rounded-full transition-colors ${form.published ? "bg-[#00FF88]" : "bg-[#9DA5B4]/20"}`}
                  onClick={() => setForm({ ...form, published: !form.published })}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow mt-0.5 transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm text-[#9DA5B4]">Publicar inmediatamente</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-[#9DA5B4] text-sm hover:border-white/20 transition-colors">
                Cancelar
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm hover:bg-[#00e67a] disabled:opacity-60 transition-colors">
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
