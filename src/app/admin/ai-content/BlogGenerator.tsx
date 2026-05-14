"use client";

import { useState } from "react";
import { Sparkles, Send, RotateCcw, Loader } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { createClient } from "@/lib/supabase/client";

interface BlogContent {
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  content: string;
}

type State = "idle" | "generating" | "preview" | "saving" | "success";

export default function BlogGenerator() {
  const [context, setContext] = useState("");
  const [state, setState] = useState<State>("idle");
  const [generatedBlog, setGeneratedBlog] = useState<BlogContent | null>(null);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleGenerate = async () => {
    if (!context.trim()) return;

    setError("");
    setState("generating");

    try {
      const response = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
        },
        body: JSON.stringify({ type: "blog", context }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.details || "Error al generar blog");
        setState("idle");
        return;
      }

      setGeneratedBlog(data.content);
      setState("preview");
    } catch (err) {
      setError("Error al conectar con el servidor");
      setState("idle");
    }
  };

  const handlePublish = async () => {
    if (!generatedBlog) return;

    setError("");
    setState("saving");

    try {
      // Generar slug desde el título
      const slug = generatedBlog.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      const { error: insertError } = await supabase.from("blog_posts").insert({
        title: generatedBlog.title,
        slug,
        excerpt: generatedBlog.description,
        content: generatedBlog.content,
        tag: generatedBlog.category,
        published: true,
      });

      if (insertError) {
        setError("Error al guardar en la base de datos");
        setState("preview");
        return;
      }

      setState("success");
      setTimeout(() => {
        setContext("");
        setGeneratedBlog(null);
        setState("idle");
        window.location.href = "/admin/blog";
      }, 2000);
    } catch (err) {
      setError("Error al publicar");
      setState("preview");
    }
  };

  const handleRegenerate = () => {
    setGeneratedBlog(null);
    setState("idle");
    handleGenerate();
  };

  if (state === "success") {
    return (
      <div className="p-8 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-[#00FF88] mb-2">¡Blog publicado!</h3>
        <p className="text-[#9DA5B4]">Redirigiendo a la sección de blogs...</p>
      </div>
    );
  }

  if (state === "preview" && generatedBlog) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-[#161B24] border border-white/5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">Título</label>
            <input
              type="text"
              value={generatedBlog.title}
              onChange={(e) =>
                setGeneratedBlog({ ...generatedBlog, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
              Descripción
            </label>
            <textarea
              value={generatedBlog.description}
              onChange={(e) =>
                setGeneratedBlog({ ...generatedBlog, description: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={generatedBlog.category}
                onChange={(e) =>
                  setGeneratedBlog({ ...generatedBlog, category: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
                Tiempo de lectura
              </label>
              <input
                type="text"
                value={generatedBlog.readTime}
                onChange={(e) =>
                  setGeneratedBlog({ ...generatedBlog, readTime: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
              Tags (separados por coma)
            </label>
            <input
              type="text"
              value={generatedBlog.tags.join(", ")}
              onChange={(e) =>
                setGeneratedBlog({
                  ...generatedBlog,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
              Contenido
            </label>
            <textarea
              value={generatedBlog.content}
              onChange={(e) =>
                setGeneratedBlog({ ...generatedBlog, content: e.target.value })
              }
              rows={12}
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50 resize-none font-mono text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handlePublish}
            disabled={state !== "preview"}
            className="flex-1 px-6 py-3 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publicar Blog
          </button>
          <button
            onClick={handleRegenerate}
            disabled={state !== "preview"}
            className="px-6 py-3 rounded-lg border border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Regenerar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-3">
          ¿Sobre qué tema quieres crear un blog? 📝
        </label>
        <div className="flex gap-2 mb-3">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Ej: quiero un blog explicando cómo usar USDC para enviar remesas a Venezuela de forma rápida y segura"
            rows={3}
            disabled={state === "generating"}
            className="flex-1 px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 resize-none"
          />
          <div className="flex flex-col gap-2">
            <VoiceInput
              onTranscript={(text) => setContext(context + " " + text)}
              disabled={state === "generating"}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={!context.trim() || state === "generating"}
        className="w-full px-6 py-3 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {state === "generating" ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            La IA está escribiendo tu blog...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generar Blog con IA
          </>
        )}
      </button>
    </div>
  );
}
