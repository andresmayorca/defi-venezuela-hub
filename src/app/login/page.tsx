import Link from "next/link";
import { Zap } from "lucide-react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-9 h-9 rounded-xl bg-[#00FF88] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#0D1117] fill-[#0D1117]" />
          </div>
          <span className="font-bold text-[#F0F1F5] text-xl">
            DeFi<span className="text-[#00FF88]">Venezuela</span>
          </span>
        </Link>

        {/* Card */}
        <div
          className="p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, #161B24 0%, #0F1319 100%)",
            border: "1px solid rgba(0,255,136,0.15)",
          }}
        >
          <h1 className="text-2xl font-bold text-[#F0F1F5] mb-2">Bienvenido</h1>
          <p className="text-[#9DA5B4]/70 text-sm mb-8 leading-relaxed">
            Inicia sesión para recibir notificaciones cuando agreguemos
            nuevo contenido al hub.
          </p>

          <GoogleLoginButton
            className="w-full"
            label="Continuar con Google"
          />

          <p className="text-[#9DA5B4]/40 text-xs mt-6 leading-relaxed">
            Al continuar aceptas recibir emails de DeFi Venezuela.
            Puedes cancelar en cualquier momento.
          </p>
        </div>

        <p className="text-center text-[#9DA5B4]/40 text-xs mt-6">
          <Link href="/" className="hover:text-[#00FF88] transition-colors">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
