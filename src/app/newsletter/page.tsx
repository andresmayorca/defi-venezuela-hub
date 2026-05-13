import Link from "next/link";
import { ChevronRight, Mail, Zap, Clock, Users, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import ComingSoon from "@/components/ui/ComingSoon";

const benefits = [
  { icon: Clock, title: "Cada lunes", desc: "Una edición semanal. Puntual, sin spam, sin rollos." },
  { icon: BookOpen, title: "Aprendizaje real", desc: "No solo noticias. Tutoriales, guías y casos de uso concretos." },
  { icon: Zap, title: "Curado con IA", desc: "Lo mejor de la semana en crypto y Web3, filtrado y explicado por IA." },
  { icon: Users, title: "Para venezolanos", desc: "Contexto local. Remesas, inflación, oportunidades en el ecosistema." },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Newsletter</span>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">📬</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4">
              El newsletter de Web3 para Venezuela
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed mb-8">
              Cada semana en tu bandeja de entrada: lo más importante del ecosistema blockchain,
              tutoriales prácticos y oportunidades DeFi — explicados en español venezolano.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0F1F5] placeholder-gray-500 focus:outline-none focus:border-[#00FF88]/50 transition-colors"
              />
              <Button type="submit" className="whitespace-nowrap flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Suscribirme
              </Button>
            </form>
            <p className="text-gray-600 text-sm">
              Sin spam. Cancela cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl border border-white/5 bg-[#161B24] text-center">
                <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 flex items-center justify-center mb-4 mx-auto">
                  <b.icon className="w-5 h-5 text-[#00FF88]" />
                </div>
                <h3 className="font-bold text-[#F0F1F5] mb-2">{b.title}</h3>
                <p className="text-[#9DA5B4]/70 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Próximamente — ediciones */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#161B24]">
        <div className="max-w-7xl mx-auto">
          <ComingSoon
            section="Newsletter"
            title="La primera edición está en producción"
            description="Estamos preparando la primera edición del newsletter. Suscríbete arriba con tu email o inicia sesión con Google para recibir una notificación cuando salga."
            emoji="📝"
            eta="Junio 2026"
            notifyLabel="Notifícame cuando salga la primera edición"
            redirectTo="/newsletter"
          />
        </div>
      </section>
    </div>
  );
}
