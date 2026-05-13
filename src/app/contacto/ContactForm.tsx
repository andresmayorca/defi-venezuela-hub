"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status messages */}
      {status === "success" && (
        <div className="p-4 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#00FF88] text-sm">
              ¡Mensaje enviado! ✅
            </p>
            <p className="text-[#00FF88]/70 text-xs mt-0.5">
              Nos pondremos en contacto en menos de 24 horas.
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-500 text-sm">Error</p>
            <p className="text-red-500/70 text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-[#F0F1F5] mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-xl bg-[#161B24] border border-white/10 text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#F0F1F5] mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-xl bg-[#161B24] border border-white/10 text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-[#F0F1F5] mb-2">
          Asunto
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="¿En qué podemos ayudarte?"
          className="w-full px-4 py-3 rounded-xl bg-[#161B24] border border-white/10 text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[#F0F1F5] mb-2">
          Mensaje
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tu mensaje..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-[#161B24] border border-white/10 text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none focus:border-[#00FF88]/50 transition-colors resize-none"
        />
      </div>

      {/* Submit button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        <Send className="w-4 h-4" />
        {loading ? "Enviando..." : "Enviar mensaje"}
      </Button>

      <p className="text-[#9DA5B4]/40 text-xs text-center">
        Respetamos tu privacidad. Solo usaremos tu email para responder a tu mensaje.
      </p>
    </form>
  );
}
