import Link from "next/link";
import { ChevronRight, Check, Star, Users, Video, MessageCircle, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

const included = [
  "Acceso completo a todos los tracks de aprendizaje",
  "Glosario Web3 y recursos curados",
  "Newsletter semanal con análisis del mercado",
  "Comunidad en Telegram",
  "Clases en vivo semanales (grabadas)",
  "Proyectos prácticos guiados",
  "Feedback de la comunidad en tus proyectos",
  "Certificados de completación",
];

const instructors = [
  {
    emoji: "👨‍💻",
    name: "El equipo DefiVenezuela",
    role: "Builders venezolanos en Web3",
    bio: "Somos venezolanos que llevamos años construyendo en el ecosistema blockchain. Sabemos lo que funciona y lo que no para el contexto latinoamericano.",
  },
];

const testimonials = [
  {
    text: "Gracias a la Academia aprendí a usar USDC para recibir pagos del exterior sin perder el 20% en comisiones. Game changer.",
    name: "María G.",
    location: "Caracas",
  },
  {
    text: "Construí mi primer bot de DeFi en 3 semanas. El acompañamiento del equipo fue clave para no perderme.",
    name: "Carlos R.",
    location: "Maracaibo",
  },
  {
    text: "El mejor contenido de Web3 en español que he encontrado. Y lo dicen así, con ejemplos venezolanos.",
    name: "Andreína M.",
    location: "Madrid (diáspora)",
  },
];

export default function AcademiaPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Academia</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-amber-500/10 text-[#00FF88] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              La academia de Web3 para Venezuela
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4">
              DefiVenezuela Academia
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Educación en blockchain, DeFi e IA para venezolanos — completamente gratis.
              Sin planes de pago, sin muros de contenido. Solo aprende y construye.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { icon: Users, text: "Comunidad activa" },
              { icon: Video, text: "Clases semanales en vivo" },
              { icon: MessageCircle, text: "Feedback personalizado" },
              { icon: Star, text: "Certificados reconocidos" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-[#9DA5B4]/70 text-sm">
                <item.icon className="w-4 h-4 text-[#00FF88]" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acceso gratuito */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#F0F1F5] mb-4">Todo gratis. Sin excusas.</h2>
            <p className="text-[#9DA5B4]/70 text-lg">
              El acceso a la academia es completamente gratuito. Creemos que la educación financiera
              no debería costar dinero, especialmente en Venezuela.
            </p>
          </div>

          <div className="rounded-2xl border border-[#00FF88]/30 bg-gradient-to-b from-[#00FF88]/5 to-[#161B24] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#F0F1F5]">Acceso completo</h3>
                <p className="text-[#9DA5B4]/70 text-sm mt-1">Todo lo que necesitas para empezar</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-bold text-[#00FF88]">Gratis</span>
                <p className="text-[#9DA5B4]/50 text-sm mt-1">Para siempre</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#9DA5B4]">
                  <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/aprende">Empezar a aprender ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#13131a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8 text-center">
            Lo que dicen los builders venezolanos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-white/5 bg-[#0a0a0f]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#00FF88] fill-[#00FF88]" />
                  ))}
                </div>
                <p className="text-[#9DA5B4] text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-[#F0F1F5] text-sm">{t.name}</div>
                  <div className="text-[#9DA5B4]/50 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
