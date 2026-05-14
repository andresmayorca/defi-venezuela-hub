"use client";

import { useState } from "react";
import { FileText, Mail } from "lucide-react";
import BlogGenerator from "./BlogGenerator";
import NewsletterGenerator from "./NewsletterGenerator";

type Tab = "blog" | "newsletter";

export default function AIContentPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "newsletter">("blog");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F0F1F5] mb-2">Generador de IA</h1>
        <p className="text-[#9DA5B4]/70">
          Crea blogs y newsletters con inteligencia artificial. Simplemente cuéntale a la IA
          qué quieres y ella lo escribe por ti.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/5">
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "blog"
              ? "text-[#00FF88] border-[#00FF88]"
              : "text-[#9DA5B4] border-transparent hover:text-[#F0F1F5]"
          }`}
        >
          <FileText className="w-5 h-5" />
          Crear Blog
        </button>
        <button
          onClick={() => setActiveTab("newsletter")}
          className={`px-6 py-3 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "newsletter"
              ? "text-[#00FF88] border-[#00FF88]"
              : "text-[#9DA5B4] border-transparent hover:text-[#F0F1F5]"
          }`}
        >
          <Mail className="w-5 h-5" />
          Crear Newsletter
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl">
        {activeTab === "blog" && <BlogGenerator />}
        {activeTab === "newsletter" && <NewsletterGenerator />}
      </div>

      {/* Tips */}
      <div className="mt-12 p-6 rounded-xl bg-[#161B24] border border-white/5">
        <h3 className="text-lg font-semibold text-[#F0F1F5] mb-3">💡 Consejos para mejores resultados:</h3>
        <ul className="space-y-2 text-[#9DA5B4]/70 text-sm">
          <li>• Sé específico: en lugar de "blog sobre crypto", prueba "cómo enviar USDC a Venezuela sin pagos de intermediarios"</li>
          <li>• Incluye contexto: "para usuarios sin experiencia en crypto" o "explicado de forma simple"</li>
          <li>• Menciona el tipo de tono: "amigable", "profesional", "como una conversación"</li>
          <li>• Por voz: habla lentamente y claramente para que se entienda mejor</li>
          <li>• Revisa el contenido generado antes de publicar — siempre puedes editar</li>
        </ul>
      </div>
    </div>
  );
}
