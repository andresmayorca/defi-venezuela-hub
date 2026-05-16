import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";

export const metadata = {
  title: "Startups & Proyectos — DefiVenezuela",
  description: "Proyectos DeFi construidos por venezolanos. Próximamente disponible.",
};

export default function StartupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-[#00FF88]/10 flex items-center justify-center border border-[#00FF88]/20">
            <Rocket className="w-10 h-10 text-[#00FF88]" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Pronto
          </h1>
          <p className="text-xl text-white/60">
            Estamos preparando un espacio para mostrar los mejores proyectos y startups DeFi construidos por venezolanos.
          </p>
        </div>

        {/* Description */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-lg font-semibold text-white">¿Qué vendrá aquí?</h2>
          <ul className="text-left text-white/60 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00FF88] font-bold mt-0.5">•</span>
              <span>Los mejores protocolos DeFi creados en Venezuela</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00FF88] font-bold mt-0.5">•</span>
              <span>Proyectos innovadores en Web3 y Blockchain</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00FF88] font-bold mt-0.5">•</span>
              <span>Startups que están revolucionando el ecosistema cripto</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00FF88] font-bold mt-0.5">•</span>
              <span>Historias de emprendimiento venezolano en DeFi</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-4 space-y-4">
          <p className="text-sm text-white/40">
            ¿Tienes un proyecto para mostrar? Contáctanos en nuestro Discord.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00FF88] text-black font-bold hover:bg-[#00e67a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
