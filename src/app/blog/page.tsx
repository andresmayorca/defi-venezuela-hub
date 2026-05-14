import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Blog — DefiVenezuela",
  description: "Artículos sobre DeFi, Web3, IA agéntica y finanzas descentralizadas para venezolanos.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-4">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Blog</span>
          </div>
          <h1 className="text-4xl font-bold text-[#F0F1F5]">Blog</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComingSoon
          section="Blog"
          title="El blog está en camino"
          description="Pronto publicaremos artículos sobre DeFi, Web3, agentes de IA y casos de uso concretos para venezolanos. Sé el primero en enterarte."
          emoji="✍️"
          eta="Julio 2026"
          notifyLabel="Notifícame cuando publiquemos el primer artículo"
          redirectTo="/blog"
        />
      </div>
    </div>
  );
}
