import Link from "next/link";
import { ChevronRight, Mail, MessageCircle, Globe } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contacto — DefiVenezuela",
  description: "¿Tienes preguntas? Contáctanos. Respondemos en menos de 24 horas.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#161B24]/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Contacto</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              Conecta con nosotros
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              ¿Tienes una pregunta, sugerencia o propuesta? Escríbenos. Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact info - 1 column */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-[#161B24]/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#00FF88]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F0F1F5] mb-1">Email</h3>
                    <a
                      href="mailto:contacto@defivenezuela.com"
                      className="text-[#9DA5B4]/60 hover:text-[#00FF88] transition-colors text-sm"
                    >
                      contacto@defivenezuela.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#161B24]/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-[#00FF88]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F0F1F5] mb-1">Discord</h3>
                    <a
                      href="https://discord.gg/defivenezuela"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9DA5B4]/60 hover:text-[#00FF88] transition-colors text-sm"
                    >
                      Discord Community
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-[#161B24]/30">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-[#00FF88]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#F0F1F5] mb-1">Respuesta</h3>
                    <p className="text-[#9DA5B4]/60 text-sm">
                      Respondemos en menos de 24 horas hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Back home */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#9DA5B4]/60 mb-4">¿No es lo que buscabas?</p>
          <Link
            href="/"
            className="text-[#00FF88] hover:text-[#00FF88]/80 transition-colors font-medium"
          >
            Volver al inicio →
          </Link>
        </div>
      </section>
    </div>
  );
}
