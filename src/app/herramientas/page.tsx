import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HerramientasPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Herramientas</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4">
              Herramientas para el ecosistema venezolano
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Soluciones de IA y blockchain para personas, freelancers y startups venezolanas.
              Sin barreras, sin excusas, en español.
            </p>
          </div>
        </div>
      </section> */}

      {/* Under Construction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 flex items-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto text-center w-full">
          <div className="text-6xl mb-8">⛏️</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6">
            Estamos construyendo <span className="text-[#00FF88]">herramientas</span>
          </h2>
          <p className="text-xl text-[#9DA5B4]/70 mb-6 leading-relaxed">
            Para nuestra comunidad. Soluciones de IA y blockchain diseñadas específicamente
            para venezolanos. Sin barreras, sin excusas.
          </p>
          <p className="text-[#9DA5B4]/50 mb-10">
            Mientras tanto, síguenos para recibir actualizaciones cuando lancemos nuestras primeras herramientas.
          </p>
          <Button size="lg" asChild>
            <a href="/unirse" className="inline-flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Notificarme cuando esté listo
            </a>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-6">🤝</div>
          <h2 className="text-3xl font-bold text-[#F0F1F5] mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-[#9DA5B4]/70 mb-8">
            Cuéntanos tu problema. Construimos soluciones a medida para el venezolano.
          </p>
          <Button size="lg" asChild>
            <a href="mailto:hola@defivenezuela.com" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Escribirnos directamente
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
