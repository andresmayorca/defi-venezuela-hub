import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

export const metadata = {
  title: "Hackathon MVPs — DefiVenezuela",
  description: "Proyectos ganadores de hackathons. El futuro de Venezuela en Web3. Próximamente disponible.",
};

export default function HackathonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/20">
            <Trophy className="w-10 h-10 text-[#00D4FF]" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Pronto
          </h1>
          <p className="text-xl text-white/60">
            Estamos preparando una galería de los mejores MVPs desarrollados en hackathons del ecosistema DeFi venezolano.
          </p>
        </div>

        {/* Description */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-lg font-semibold text-white">¿Qué vendrá aquí?</h2>
          <ul className="text-left text-white/60 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00D4FF] font-bold mt-0.5">•</span>
              <span>Proyectos ganadores de hackathons nacionales e internacionales</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00D4FF] font-bold mt-0.5">•</span>
              <span>MVPs innovadores con enfoque en DeFi y Web3</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00D4FF] font-bold mt-0.5">•</span>
              <span>Historias de equipos que compitieron y ganaron</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00D4FF] font-bold mt-0.5">•</span>
              <span>Recursos y guías para participar en hackathons</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-4 space-y-4">
          <p className="text-sm text-white/40">
            ¿Ganaste un hackathon? ¡Cuéntanos tu historia en nuestro Discord!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00D4FF] text-black font-bold hover:bg-[#00c5f0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
