import Link from "next/link";
import { ChevronRight, Check, ArrowRight, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

const tools = [
  {
    icon: "📊",
    name: "DeFi Analytics Dashboard",
    tagline: "Visibilidad total de tu portafolio DeFi",
    description: "Monitorea en tiempo real todos tus activos, pools de liquidez, yields y exposición al riesgo en múltiples cadenas. Alertas inteligentes cuando algo cambia.",
    highlight: false,
    features: [
      "Soporte multi-cadena (ETH, BSC, Polygon, Arbitrum)",
      "Tracking de pools y posiciones LP",
      "Alertas de riesgo por email y Telegram",
      "Dashboard personalizable",
      "Exportación de reportes",
      "Historial completo",
    ],
    cta: "Solicitar acceso",
    href: "mailto:hola@defivenezuela.com",
  },
  {
    icon: "🤖",
    name: "Agentes IA Personalizados",
    tagline: "Tu asistente inteligente trabajando 24/7",
    description: "Construimos agentes de IA a medida para ti, tu negocio o startup. Automatización de procesos, análisis de datos y más — sin conocimientos técnicos requeridos.",
    highlight: true,
    features: [
      "Diseño y desarrollo a medida",
      "Integración con tus herramientas actuales",
      "Agentes de análisis de mercado crypto",
      "Automatización de flujos de trabajo",
      "Mantenimiento y mejora continua",
      "Soporte en español",
    ],
    cta: "Hablar con el equipo",
    href: "mailto:hola@defivenezuela.com",
  },
  {
    icon: "🔐",
    name: "Compliance Crypto",
    tagline: "Navega la regulación con confianza",
    description: "Consultoría para personas y empresas que trabajan con criptomonedas en Venezuela y LATAM. KYC, reportes y estrategia regulatoria sin complicaciones.",
    highlight: false,
    features: [
      "Diagnóstico de situación regulatoria",
      "Guía práctica de KYC/AML",
      "Estrategia de cumplimiento",
      "Reportes para autoridades",
      "Capacitación personalizada",
      "Acompañamiento continuo",
    ],
    cta: "Agendar consulta",
    href: "mailto:hola@defivenezuela.com",
  },
];

const faqs = [
  {
    q: "¿Aceptan pagos en USDC?",
    a: "Sí. Aceptamos USDC en Polygon y Arbitrum. También transferencias en USD.",
  },
  {
    q: "¿Tienen soporte en español?",
    a: "100%. Nuestro equipo es venezolano. Todo en español, sin excusas.",
  },
  {
    q: "¿Puedo solicitar una demo?",
    a: "Sí, ofrecemos demos gratuitas de 30 minutos. Solo escríbenos.",
  },
  {
    q: "¿Es solo para empresas?",
    a: "No. Trabajamos con personas, freelancers, emprendedores y startups. Si tienes una necesidad, hablemos.",
  },
];

export default function HerramientasPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
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
      </section>

      {/* Tools grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tool.highlight
                    ? "border border-[#00FF88]/30 bg-gradient-to-b from-[#00FF88]/5 to-[#161B24] glow-primary"
                    : "border border-white/5 bg-[#161B24]"
                }`}
              >
                {tool.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-[#00FF88] text-[#0D1117] text-xs font-bold">
                      MÁS SOLICITADO
                    </span>
                  </div>
                )}

                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-[#F0F1F5] mb-1">{tool.name}</h3>
                <p className="text-[#00FF88] text-sm font-medium mb-4">{tool.tagline}</p>
                <p className="text-[#9DA5B4]/70 text-sm leading-relaxed mb-6 flex-1">{tool.description}</p>

                <ul className="flex flex-col gap-3 mb-8">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#9DA5B4]">
                      <Check className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={tool.highlight ? "primary" : "outline"} asChild className="w-full">
                  <a href={tool.href} className="flex items-center justify-center gap-2">
                    {tool.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8 text-center">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-xl border border-white/5 bg-[#0D1117]">
                <h3 className="font-semibold text-[#F0F1F5] mb-2">{faq.q}</h3>
                <p className="text-[#9DA5B4]/70 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
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
