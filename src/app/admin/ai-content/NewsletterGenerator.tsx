"use client";

import { useState } from "react";
import { Sparkles, Save, RotateCcw, Loader } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { createClient } from "@/lib/supabase/client";

interface NewsletterContent {
  title: string;
  content_html: string;
}

type State = "idle" | "generating" | "preview" | "saving" | "success";

export default function NewsletterGenerator() {
  const [context, setContext] = useState("");
  const [state, setState] = useState<State>("idle");
  const [generatedNewsletter, setGeneratedNewsletter] = useState<NewsletterContent | null>(null);
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
        body: JSON.stringify({ type: "newsletter", context }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.details || "Error al generar newsletter");
        setState("idle");
        return;
      }

      setGeneratedNewsletter(data.content);
      setState("preview");
    } catch (err) {
      setError("Error al conectar con el servidor");
      setState("idle");
    }
  };

  const handleSave = async () => {
    if (!generatedNewsletter) return;

    setError("");
    setState("saving");

    try {
      const { error: insertError } = await supabase
        .from("newsletter_drafts")
        .insert({
          title: generatedNewsletter.title,
          content_html: generatedNewsletter.content_html,
        });

      if (insertError) {
        setError("Error al guardar el draft");
        setState("preview");
        return;
      }

      setState("success");
      setTimeout(() => {
        setContext("");
        setGeneratedNewsletter(null);
        setState("idle");
        window.location.href = "/admin/newsletters";
      }, 2000);
    } catch (err) {
      setError("Error al guardar");
      setState("preview");
    }
  };

  const handleRegenerate = () => {
    setGeneratedNewsletter(null);
    setState("idle");
    handleGenerate();
  };

  if (state === "success") {
    return (
      <div className="p-8 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-[#00FF88] mb-2">¡Newsletter guardado!</h3>
        <p className="text-[#9DA5B4]">
          El borrador está listo para revisar y enviar. Redirigiendo...
        </p>
      </div>
    );
  }

  if (state === "preview" && generatedNewsletter) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-[#161B24] border border-white/5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
              Título del Newsletter
            </label>
            <input
              type="text"
              value={generatedNewsletter.title}
              onChange={(e) =>
                setGeneratedNewsletter({
                  ...generatedNewsletter,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#9DA5B4] mb-2">
              Contenido HTML
            </label>
            <textarea
              value={generatedNewsletter.content_html}
              onChange={(e) =>
                setGeneratedNewsletter({
                  ...generatedNewsletter,
                  content_html: e.target.value,
                })
              }
              rows={16}
              className="w-full px-4 py-2 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/50 resize-none font-mono text-sm"
            />
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-400 mb-3 font-semibold">Preview del Email:</p>
            <div
              className="bg-white rounded-lg p-4 text-black max-h-96 overflow-auto"
              dangerouslySetInnerHTML={{
                __html: generatedNewsletter.content_html,
              }}
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
            onClick={handleSave}
            disabled={state !== "preview"}
            className="flex-1 px-6 py-3 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar como Borrador
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
          ¿Qué tema quieres en el newsletter? 📰
        </label>
        <div className="flex gap-2 mb-3">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Ej: quiero hablar sobre las mejores prácticas para asegurar tu cartera de crypto, riesgos comunes y cómo evitarlos"
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
            La IA está escribiendo el newsletter...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generar Newsletter con IA
          </>
        )}
      </button>
    </div>
  );
}
