import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProponerForm from "./ProponerForm";

export const metadata = {
  title: "Proponer mi comunidad",
  description: "¿Tienes una comunidad cripto venezolana? Propónla para que la incluyan en el directorio de DeFi Venezuela.",
};

export default function ProponerPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#161B24]/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/comunidades" className="hover:text-[#00FF88] transition-colors">
              Comunidades
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Proponer</span>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4 leading-tight">
              Propón tu <span className="text-[#00FF88]">comunidad</span>
            </h1>
            <p className="text-lg text-[#9DA5B4]/70 max-w-2xl">
              ¿Lideras una comunidad cripto venezolana activa? Cuéntanos sobre ella y la
              incluiremos en el directorio de DeFi Venezuela para conectarla con más usuarios.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl border border-[#00FF88]/20 bg-[#161B24]/30">
            <ProponerForm />
          </div>
        </div>
      </section>
    </div>
  );
}
