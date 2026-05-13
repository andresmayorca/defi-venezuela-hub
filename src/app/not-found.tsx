import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#00FF88]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#161B24]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-md">
        <div className="text-8xl mb-8 animate-bounce">🌌</div>

        <h1 className="text-5xl sm:text-6xl font-bold text-[#F0F1F5] mb-4">
          404
        </h1>

        <p className="text-xl text-[#9DA5B4]/70 mb-2">
          Página no encontrada
        </p>

        <p className="text-[#9DA5B4]/50 mb-8 leading-relaxed">
          Parece que te perdiste en el espacio cripto. No encontramos lo que buscabas, pero el ecosistema DeFi sigue aquí esperándote.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" asChild>
            <Link href="/" className="flex items-center gap-2 justify-center">
              <Home className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/aprende" className="flex items-center gap-2 justify-center">
              Ir a Aprende
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[#9DA5B4]/40 text-sm mb-4">
            ¿Necesitas ayuda?
          </p>
          <Link
            href="/contacto"
            className="text-[#00FF88] hover:text-[#00FF88]/80 transition-colors text-sm font-medium"
          >
            Contáctanos aquí →
          </Link>
        </div>
      </div>
    </div>
  );
}
