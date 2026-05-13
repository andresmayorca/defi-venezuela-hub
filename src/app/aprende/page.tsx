import Link from "next/link";
import { ChevronRight, Clock, BookOpen, Lock } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

const tracks = [
  {
    emoji: "⛓️",
    title: "Blockchain Básico",
    slug: "blockchain",
    level: "Principiante",
    duration: "4 horas",
    lessons: 8,
    description: "Todo lo que necesitas saber para entender blockchain desde cero. Sin matemáticas complicadas, sin jerga innecesaria.",
    topics: ["¿Qué es blockchain?", "Bitcoin y Ethereum", "Wallets y claves privadas", "Transacciones on-chain", "Gas y comisiones", "Seguridad básica"],
  },
  {
    emoji: "🏦",
    title: "DeFi 101",
    slug: "defi",
    level: "Intermedio",
    duration: "6 horas",
    lessons: 12,
    description: "Finanzas descentralizadas explicadas para el venezolano que ya sabe que el sistema bancario tradicional no funciona.",
    topics: ["¿Qué es DeFi?", "DEXs y AMMs", "Liquidity pools", "Yield farming", "Stablecoins (USDC, DAI)", "Riesgos y seguridad"],
  },
  {
    emoji: "🌐",
    title: "Web3 & NFTs",
    slug: "web3",
    level: "Intermedio",
    duration: "5 horas",
    lessons: 10,
    description: "El internet del futuro. Aprende cómo Web3 cambia la propiedad digital y por qué importa para Venezuela.",
    topics: ["Web1 vs Web2 vs Web3", "Smart contracts", "NFTs explicados", "DAOs y gobernanza", "Identidad digital", "Casos de uso reales"],
  },
  {
    emoji: "🤖",
    title: "Agentes de IA",
    slug: "agentes-ia",
    level: "Avanzado",
    duration: "8 horas",
    lessons: 15,
    description: "Construye agentes inteligentes que trabajen por ti. La intersección de IA y blockchain es el mayor diferenciador del momento.",
    topics: ["¿Qué son los agentes IA?", "APIs de IA (Claude, GPT)", "Agentes con herramientas", "Automatización de workflows", "Agentes en DeFi", "Monetizar con agentes"],
  },
];

const levelColors: Record<string, string> = {
  Principiante: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermedio: "text-[#00FF88] bg-[#00FF88]/10 border-[#00FF88]/20",
  Avanzado: "text-[#9DA5B4] bg-[#9DA5B4]/10 border-[#9DA5B4]/20",
};

export default function AprendePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
              <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#9DA5B4]">Aprende</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4">
              Centro de aprendizaje
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Rutas de aprendizaje diseñadas para el venezolano. Desde cero hasta construir
              con blockchain, DeFi y agentes de IA. Gratis, en español, sin excusas.
            </p>
          </div>
        </div>
      </section>

      {/* Tracks — coming soon */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#F0F1F5]">Rutas de aprendizaje</h2>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/8 text-[#00FF88] font-semibold">
              <Clock className="w-3 h-3" />
              Próximamente
            </span>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            {tracks.map((track) => (
              <div
                key={track.slug}
                className="relative group rounded-2xl border border-white/5 bg-[#161B24] overflow-hidden opacity-70"
              >
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-[#0D1117]/40 flex items-center justify-end pr-8 pointer-events-none z-10">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161B24] border border-white/10">
                    <Lock className="w-4 h-4 text-[#9DA5B4]/50" />
                    <span className="text-xs text-[#9DA5B4]/50 font-medium">Próximamente</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="text-5xl">{track.emoji}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-[#F0F1F5]">{track.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${levelColors[track.level]}`}>
                          {track.level}
                        </span>
                      </div>
                      <p className="text-[#9DA5B4]/70 leading-relaxed mb-4">{track.description}</p>
                      <div className="flex items-center gap-6 text-sm text-[#9DA5B4]/50 mb-4">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {track.lessons} lecciones
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {track.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {track.topics.map((topic) => (
                          <span key={topic} className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#9DA5B4]/70 border border-white/5">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notify CTA */}
          <ComingSoon
            section="Aprende"
            title="Los tracks están en producción"
            description="Estamos creando el contenido con la máxima calidad para el contexto venezolano. Entérate en cuanto estén listos."
            emoji="🎓"
            eta="Agosto 2026"
            notifyLabel="Notifícame cuando lancemos los primeros tracks"
            redirectTo="/aprende"
          />
        </div>
      </section>
    </div>
  );
}
