"use client";

import { useState } from "react";
import { Send, Trash2, Eye, Loader, AlertCircle, CheckCircle } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  content_html: string;
  generated_at: string;
  approved_at?: string;
  approved_by?: string;
}

interface NewsletterPreviewProps {
  newsletter: Newsletter;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function NewsletterPreview({
  newsletter,
  onClose,
  onSuccess,
}: NewsletterPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/admin/approve-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
        },
        body: JSON.stringify({
          draftId: newsletter.id,
          action: "approve",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Error al enviar newsletter");
      } else {
        setStatus("success");
        setMessage(data.message);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 2000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("¿Estás seguro? Se eliminará este borrador.")) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/admin/approve-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
        },
        body: JSON.stringify({
          draftId: newsletter.id,
          action: "reject",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Error al rechazar");
      } else {
        setStatus("success");
        setMessage("Newsletter rechazado");
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error al conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161B24] rounded-2xl border border-[#00FF88]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#161B24] border-b border-[#00FF88]/30 p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-1">
              {newsletter.title}
            </h2>
            <p className="text-xs text-[#9DA5B4]/50">
              Generado:{" "}
              {new Date(newsletter.generated_at).toLocaleString("es-VE")}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-[#9DA5B4]/50 hover:text-[#F0F1F5] text-2xl disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6">
          {status === "success" && (
            <div className="p-4 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#00FF88] text-sm">{message}</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-500 text-sm">{message}</p>
              </div>
            </div>
          )}

          {!showPreview ? (
            <div>
              <button
                onClick={() => setShowPreview(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20 transition-colors mb-6"
              >
                <Eye className="w-4 h-4" />
                Ver vista previa del email
              </button>

              <div className="space-y-3">
                <p className="text-sm text-[#9DA5B4] mb-4">
                  Revisa el contenido antes de enviar. Una vez enviado, se
                  notificará a todos los suscriptores del newsletter.
                </p>

                <div className="space-y-2">
                  <label className="block text-xs text-[#9DA5B4] font-semibold">
                    Acciones
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={handleApprove}
                      disabled={loading || status === "success"}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Aprobar y Enviar
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReject}
                      disabled={loading}
                      className="px-4 py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowPreview(false)}
                className="mb-4 text-sm text-[#00FF88] hover:text-[#00FF88]/80"
              >
                ← Volver
              </button>
              <div
                className="rounded-lg border border-white/5 p-4 bg-white text-black"
                dangerouslySetInnerHTML={{ __html: newsletter.content_html }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
