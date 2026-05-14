"use client";

import { useState } from "react";
import { Send, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { sendNotification } from "@/lib/notifications";

interface SendNotificationModalProps {
  section: "blog" | "herramientas" | "eventos" | "agentic" | "aprende" | "empleos" | "newsletter";
  title: string;
  url?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SendNotificationModal({
  section,
  title,
  url,
  onClose,
  onSuccess,
}: SendNotificationModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(0);

  const handleSend = async () => {
    setLoading(true);
    setStatus("idle");

    const response = await sendNotification({
      section,
      title,
      url,
    });

    if (response.error) {
      setStatus("error");
      setMessage(response.error);
    } else {
      setStatus("success");
      setSent(response.sent ?? 0);
      setMessage(response.message ?? "Notificación enviada");
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161B24] rounded-2xl border border-[#00FF88]/30 p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#F0F1F5] mb-4">
          Enviar Notificación
        </h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-[#9DA5B4] mb-1">Sección</label>
            <div className="px-4 py-2 bg-[#0D1117] rounded-lg text-[#F0F1F5] text-sm font-medium capitalize">
              {section}
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#9DA5B4] mb-1">Título</label>
            <div className="px-4 py-2 bg-[#0D1117] rounded-lg text-[#F0F1F5] text-sm break-words">
              {title}
            </div>
          </div>

          {url && (
            <div>
              <label className="block text-sm text-[#9DA5B4] mb-1">URL</label>
              <div className="px-4 py-2 bg-[#0D1117] rounded-lg text-[#00FF88] text-xs break-all truncate">
                {url}
              </div>
            </div>
          )}
        </div>

        {status === "success" && (
          <div className="p-4 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 mb-6 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#00FF88] text-sm">{message}</p>
              <p className="text-[#00FF88]/70 text-xs mt-1">
                Enviado a {sent} suscriptor{sent !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-500 text-sm">Error</p>
              <p className="text-red-500/70 text-xs mt-1">{message}</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-[#9DA5B4] hover:bg-[#0D1117] transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={loading || status === "success"}
            className="flex-1 px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Enviado
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
