import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Protocolos DeFi — DefiVenezuela",
  description: "Protocolos DeFi curados y contextualizados para venezolanos.",
};

export default function ProtocolosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-4">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Protocolos DeFi</span>
          </div>
          <h1 className="text-4xl font-bold text-[#F0F1F5]">Protocolos DeFi</h1>
        </div>
      </section>

      {/* Coming Soon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComingSoon
          section="Protocolos DeFi"
          title="Los protocolos están en curación"
          description="Estamos estudiando cuáles son los protocolos DeFi más relevantes y seguros para la realidad venezolana. Pronto tendrás una guía completa con análisis de riesgo, casos de uso locales y cómo empezar."
          emoji="⚗️"
          eta="Proximamente"
          notifyLabel="Notifícame cuando publiquemos los protocolos curados"
          redirectTo="/protocolos"
        />
      </div>

      {/*
      ============================================
      SECCIÓN COMENTADA - DESCOMENTAR CUANDO:
      1. Tengas definidos los protocolos para Venezuela
      2. Hayas hecho el estudio de riesgos y relevancia
      3. Tengas contenido educativo asociado
      ============================================

      const protocols = [
        {
          name: "Aave",
          emoji: "👻",
          category: "Préstamos",
          tvl: "$12.4B",
          chain: "Multi-chain",
          description: "El protocolo de préstamos DeFi más grande...",
          // ... más datos
        },
        // ... más protocolos
      ];

      const categories = ["Todos", "Préstamos", "DEX", "Stablecoins", "Liquid Staking", "Perpetuales", "Yield Trading"];

      const riskColors = {
        Bajo: "text-green-400 bg-green-400/10 border border-green-400/20",
        // ... más colores
      };

      Renderizar:
      - Header con stats
      - Risk disclaimer
      - Filter buttons (categorías)
      - Grid de protocolos (2 columnas)
      - Sección "Por dónde empezar"

      ============================================
      */}
    </div>
  );
}
