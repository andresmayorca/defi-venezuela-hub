"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle, Loader } from "lucide-react";

interface FormData {
  nombre: string;
  dedicacion: string;
  twitter: string;
  website?: string;
  otras_redes?: string;
}

export default function ProponerForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    dedicacion: "",
    twitter: "",
    website: "",
    otras_redes: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    // Validación de campos requeridos
    if (!formData.nombre.trim()) {
      setStatus("error");
      setMessage("El nombre de la comunidad es requerido");
      setLoading(false);
      return;
    }

    if (!formData.dedicacion.trim()) {
      setStatus("error");
      setMessage("Cuéntanos a qué se dedica la comunidad");
      setLoading(false);
      return;
    }

    if (!formData.twitter.trim()) {
      setStatus("error");
      setMessage("El Twitter es requerido");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/comunidades/proponer-comunidad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        const errorMessage = data.details || data.error || "Error al enviar la propuesta";
        setMessage(errorMessage);
      } else {
        setStatus("success");
        setMessage("¡Propuesta enviada! Nos pondremos en contacto pronto.");
        setFormData({
          nombre: "",
          dedicacion: "",
          twitter: "",
          website: "",
          otras_redes: "",
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "success" && (
        <div className="p-4 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#00FF88] text-sm">{message}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-500 text-sm">{message}</p>
          </div>
        </div>
      )}

      {/* Nombre de la comunidad */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Nombre de la comunidad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          disabled={loading || status === "success"}
          placeholder="Ej: DeFi Venezuela Bitcoin"
          className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 transition-colors"
        />
      </div>

      {/* A qué se dedica */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          ¿A qué se dedica la comunidad? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="dedicacion"
          value={formData.dedicacion}
          onChange={handleChange}
          disabled={loading || status === "success"}
          placeholder="Cuéntanos qué temas cubre, el tamaño aproximado de miembros, actividades principales, etc."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 resize-none transition-colors"
        />
      </div>

      {/* Twitter */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Twitter de la comunidad o del owner <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          disabled={loading || status === "success"}
          placeholder="Ej: @defivenezuela o twitter.com/defivenezuela"
          className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 transition-colors"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Página web de la comunidad{" "}
          <span className="text-[#9DA5B4]/50 text-xs font-normal">(opcional)</span>
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          disabled={loading || status === "success"}
          placeholder="Ej: https://defivenezuela.com"
          className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 transition-colors"
        />
      </div>

      {/* Otras redes */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Otras redes <span className="text-[#9DA5B4]/50 text-xs font-normal">(opcional)</span>
        </label>
        <textarea
          name="otras_redes"
          value={formData.otras_redes}
          onChange={handleChange}
          disabled={loading || status === "success"}
          placeholder="Discord, Telegram, YouTube, LinkedIn, etc. Con los links"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 resize-none transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || status === "success"}
        className="w-full px-6 py-3 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Proponer comunidad
          </>
        )}
      </button>

      <p className="text-xs text-[#9DA5B4]/50 text-center">
        Nos pondremos en contacto en los próximos días para validar la información y agregarte al directorio.
      </p>
    </form>
  );
}
