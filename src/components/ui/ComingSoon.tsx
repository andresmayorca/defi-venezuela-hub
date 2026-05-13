import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Bell, Clock } from "lucide-react";

interface ComingSoonProps {
  section: string;          // e.g. "blog", "eventos"
  title: string;
  description: string;
  emoji?: string;
  eta?: string;             // e.g. "Julio 2026"
  notifyLabel?: string;
  redirectTo?: string;
}

export default function ComingSoon({
  section,
  title,
  description,
  emoji = "🚧",
  eta,
  notifyLabel,
  redirectTo,
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/8 text-[#00FF88] text-xs font-semibold tracking-widest uppercase mb-6">
        <Clock className="w-3 h-3" />
        Próximamente
        {eta && <span className="opacity-60">· {eta}</span>}
      </div>

      {/* Emoji */}
      <div className="text-7xl mb-6 select-none">{emoji}</div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4 max-w-xl leading-tight">
        {title}
      </h2>
      <p className="text-[#9DA5B4]/70 max-w-md leading-relaxed mb-10">
        {description}
      </p>

      {/* Notify CTA */}
      <div
        className="w-full max-w-sm p-6 rounded-2xl text-left"
        style={{
          background: "linear-gradient(135deg, rgba(22,27,36,0.8) 0%, rgba(13,17,23,0.9) 100%)",
          border: "1px solid rgba(0,255,136,0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-[#00FF88]" />
          <span className="text-sm font-semibold text-[#F0F1F5]">
            {notifyLabel ?? `Notifícame cuando abra ${section}`}
          </span>
        </div>
        <p className="text-xs text-[#9DA5B4]/60 mb-4 leading-relaxed">
          Inicia sesión con Google y te avisamos por email cuando publiquemos el primer contenido.
        </p>
        <GoogleLoginButton
          redirectTo={redirectTo ?? "/unirse/completar"}
          label="Notificarme con Google"
          className="w-full"
        />
      </div>
    </div>
  );
}
