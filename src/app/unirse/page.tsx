"use client";

import { CheckCircle } from "lucide-react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

const benefits = [
  { icon: "🔔", title: "Notificaciones", desc: "Recibe actualizaciones de empleo y eventos" },
  { icon: "👥", title: "Comunidad", desc: "Conecta con builders y traders de Venezuela" },
  { icon: "📚", title: "Aprende", desc: "Acceso a tracks y recursos exclusivos" },
  { icon: "💼", title: "Oportunidades", desc: "Descubre empleos Web3 en el ecosistema" },
  { icon: "🛠️", title: "Herramientas", desc: "Las mejores herramientas DeFi curadas" },
  { icon: "📅", title: "Eventos", desc: "Meetups, hackathons y conferencias" },
];

export default function UnirseP() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Beneficios */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 mb-4">
                <span className="text-xs font-semibold text-[#00FF88] uppercase tracking-wider">Únete hoy</span>
              </div>
              <h1 className="text-4xl font-bold text-[#F0F1F5] mb-3">
                Conecta con el ecosistema DeFi de Venezuela
              </h1>
              <p className="text-lg text-[#9DA5B4]">
                Sé parte de la comunidad que está transformando las finanzas en Venezuela.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{benefit.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[#F0F1F5]">{benefit.title}</h3>
                    <p className="text-sm text-[#9DA5B4]">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: Form */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#161B24] p-8">
              <h2 className="text-2xl font-bold text-[#F0F1F5] mb-2">Bienvenido</h2>
              <p className="text-sm text-[#9DA5B4] mb-8">
                Continúa con Google para crear tu cuenta y acceder a todos los beneficios.
              </p>

              <GoogleLoginButton
                label="Continuar con Google"
                redirectTo="/unirse/completar"
                className="w-full mb-4"
              />

              <p className="text-xs text-[#9DA5B4]/50 text-center">
                Al continuar, aceptas nuestros términos y política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
