import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import ComingSoon from "@/components/ui/ComingSoon";

export default function EventosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Eventos</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Próximos eventos
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4 leading-tight">
              El ecosistema Web3{" "}
              <span className="text-[#00FF88]">venezolano en vivo</span>
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Conferencias, hackathons, workshops y meetups. Conecta con la comunidad cripto
              venezolana dentro y fuera del país.
            </p>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComingSoon
          section="Eventos"
          title="Los primeros eventos ya se están organizando"
          description="Estamos coordinando hackathons, workshops y meetups para la comunidad venezolana. Entérate en cuanto anunciemos el primero."
          emoji="📅"
          eta="Junio 2026"
          notifyLabel="Notifícame cuando anunciemos el primer evento"
          redirectTo="/eventos"
        />
      </div>
    </div>
  );
}
