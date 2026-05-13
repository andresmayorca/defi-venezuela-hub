"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const sections = [
  { key: "blog", label: "Blog", desc: "Nuevos artículos y análisis DeFi" },
  { key: "herramientas", label: "Herramientas", desc: "Nuevas herramientas y servicios" },
  { key: "empleos", label: "Empleos", desc: "Ofertas de trabajo Web3" },
  { key: "eventos", label: "Eventos", desc: "Hackathons, meetups y conferencias" },
  { key: "agentic", label: "Agentic World", desc: "Casos de uso y proyectos IA" },
  { key: "aprende", label: "Aprende", desc: "Nuevos tracks y lecciones" },
];

export default function NotificationsForm({ userId }: { userId: string }) {
  const supabase = createClient();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadPrefs = async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (data) {
        setPrefs({
          blog: data.notify_blog ?? true,
          herramientas: data.notify_herramientas ?? true,
          empleos: data.notify_empleos ?? true,
          eventos: data.notify_eventos ?? true,
          agentic: data.notify_agentic ?? true,
          aprende: data.notify_aprende ?? true,
        });
      }

      setLoading(false);
    };

    loadPrefs();
  }, [userId, supabase]);

  const togglePref = (key: string) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("subscribers")
        .update({
          notify_blog: prefs.blog,
          notify_herramientas: prefs.herramientas,
          notify_empleos: prefs.empleos,
          notify_eventos: prefs.eventos,
          notify_agentic: prefs.agentic,
          notify_aprende: prefs.aprende,
        })
        .eq("user_id", userId);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("✓ Preferencias actualizadas");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-[#9DA5B4]">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl">
      <p className="text-[#9DA5B4] mb-6">
        Elige qué secciones quieres que te notifiquemos cuando haya nuevos contenidos.
      </p>

      <div className="space-y-3 mb-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#161B24] hover:bg-white/2 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-[#F0F1F5]">{section.label}</h3>
              <p className="text-sm text-[#9DA5B4]">{section.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => togglePref(section.key)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                prefs[section.key] ? "bg-[#00FF88]" : "bg-[#9DA5B4]/20"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs[section.key] ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm mb-6 ${
            message.includes("✓")
              ? "bg-green-400/10 text-green-400"
              : "bg-red-400/10 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm disabled:opacity-60 hover:bg-[#00e67a] transition-colors"
      >
        {saving ? "Guardando..." : "Guardar preferencias"}
      </button>
    </div>
  );
}
