import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, BookOpen, Bot, Wrench, Users, Newspaper,
  ChevronRight, TrendingUp, Shield, Globe, Zap, Calendar, Briefcase,
} from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "DefiVenezuela | Hub de educación, comunidad y herramientas Web3",
  description: "El hub de educación, comunidad y herramientas para venezolanos en Web3. Aprende DeFi, construye con IA agéntica, accede a empleos remoto en cripto.",
  keywords: ["DeFi", "blockchain", "Web3", "Venezuela", "cripto", "IA", "finanzas descentralizadas"],
  openGraph: {
    title: "DefiVenezuela — Hub Web3 para venezolanos",
    description: "Educación, comunidad y herramientas DeFi 100% en español",
    type: "website",
    url: "https://defivenezuela.com",
    images: [
      {
        url: "https://defivenezuela.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "DefiVenezuela",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DefiVenezuela",
    description: "Educación, comunidad y herramientas Web3 para venezolanos",
  },
};

const tracks = [
  {
    icon: "⛓️",
    title: "Blockchain Básico",
    description: "Entiende cómo funciona la tecnología que está cambiando el mundo. Sin tecnicismos.",
    lessons: 8,
    level: "Principiante",
    href: "/aprende/blockchain",
  },
  {
    icon: "🏦",
    title: "DeFi 101",
    description: "Aprende a usar protocolos de finanzas descentralizadas. Ahorros, préstamos y más.",
    lessons: 12,
    level: "Intermedio",
    href: "/aprende/defi",
  },
  {
    icon: "🌐",
    title: "Web3 & NFTs",
    description: "El internet del futuro y los activos digitales explicados para el venezolano.",
    lessons: 10,
    level: "Intermedio",
    href: "/aprende/web3",
  },
  {
    icon: "🤖",
    title: "Agentes de IA",
    description: "Construye agentes inteligentes que trabajen por ti. El futuro del trabajo.",
    lessons: 15,
    level: "Avanzado",
    href: "/aprende/agentes-ia",
  },
];

const stats = [
  { value: "10K+", label: "Venezolanos en la comunidad" },
  { value: "50+", label: "Recursos gratuitos" },
  { value: "4", label: "Tracks de aprendizaje" },
  { value: "100%", label: "En español venezolano" },
];

const features = [
  { icon: BookOpen, title: "Aprende a tu ritmo", description: "Contenido estructurado desde cero hasta avanzado, pensado para el contexto venezolano." },
  { icon: Bot, title: "IA + Blockchain", description: "El único hub en Venezuela que combina agentes de IA con el ecosistema DeFi." },
  { icon: Wrench, title: "Herramientas reales", description: "No solo teoría. Accede a herramientas que puedes usar hoy para proteger tu capital." },
  { icon: Users, title: "Comunidad activa", description: "Miles de venezolanos aprendiendo y construyendo juntos en Web3." },
  { icon: Shield, title: "USDC & Remesas", description: "Casos de uso concretos: cómo recibir remesas en USDC y escapar de la inflación." },
  { icon: Globe, title: "Diáspora conectada", description: "Venezuela dentro y fuera. Conectamos a la diáspora con el ecosistema descentralizado." },
];

// Placeholder for upcoming blog posts - REMOVED DEFAULT CONTENT
const recentPosts: any[] = [];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="hero-glow relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#00FF88]/12 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#161B24]/60 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0D1117_100%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              El Hub DeFi de Venezuela 🇻🇪
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F0F1F5] mb-6 leading-[1.1] tracking-tight">
              Conecta con el ecosistema{" "}
              <span className="gradient-text">DeFi de Venezuela</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#9DA5B4]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              La plataforma que reúne comunidades, eventos, empleos y oportunidades
              del ecosistema DeFi venezolano en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/aprende" className="flex items-center gap-2">
                  Empieza a aprender gratis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/newsletter" className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Newsletter semanal
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#00FF88]/10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-6 px-4 bg-gradient-to-b from-[#161B24]/40 to-[#0D1117]/60 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-[#9DA5B4]">{stat.value}</div>
                <div className="text-xs text-[#9DA5B4]/50 mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#111827]/50 to-[#0D1117] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-3">Aprende</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4">¿Por dónde empiezas?</h2>
            <p className="text-[#9DA5B4]/60 max-w-xl mx-auto">
              4 rutas diseñadas para el venezolano. Sin prerrequisitos, sin pasos perdidos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tracks.map((track) => (
              <Link
                key={track.title}
                href={track.href}
                className="group relative rounded-2xl p-6 transition-all duration-300 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #161B24 0%, #0F1319 100%)",
                  border: "1px solid rgba(0,255,136,0.15)",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #1E2433 0%, #0F1319 100%)" }} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88]/5 rounded-full blur-2xl group-hover:bg-[#00FF88]/10 transition-all duration-300" />

                <div className="relative flex items-start gap-4">
                  <div className="text-4xl">{track.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#F0F1F5] group-hover:text-[#9DA5B4] transition-colors">
                        {track.title}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#00FF88]/10 text-[#9DA5B4]/60 border border-[#00FF88]/15">
                        {track.level}
                      </span>
                    </div>
                    <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-4">{track.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9DA5B4]/40">{track.lessons} lecciones</span>
                      <span className="text-[#00FF88] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Comenzar <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/aprende">Ver todos los recursos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, #0D1117 0%, #111827 50%, #0D1117 100%)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00FF88]/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-3">Por qué DefiVenezuela</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4">
              Hecho para la realidad venezolana
            </h2>
            <p className="text-[#9DA5B4]/60 max-w-xl mx-auto">
              No es contenido traducido. Es contenido creado pensando en la inflación,
              las remesas y los sueños de los venezolanos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: "linear-gradient(135deg, rgba(22,27,36,0.6) 0%, rgba(13,17,23,0.8) 100%)",
                  border: "1px solid rgba(0,255,136,0.1)",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))" }}>
                  <feature.icon className="w-5 h-5 text-[#00FF88]" />
                </div>
                <h3 className="font-bold text-[#F0F1F5] mb-2">{feature.title}</h3>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agentic World */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
            style={{
              background: "linear-gradient(135deg, #161B24 0%, #0F1319 50%, #0D1117 100%)",
              border: "1px solid rgba(0,255,136,0.2)",
              boxShadow: "0 0 80px rgba(0,255,136,0.08), inset 0 1px 0 rgba(157,165,180,0.05)",
            }}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/6 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9DA5B4]/3 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-6">
                  <Bot className="w-3 h-3" />
                  NUEVO — Agentic World
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4 leading-tight">
                  Venezuela entra a la era de los{" "}
                  <span className="gradient-text">Agentes de IA</span>
                </h2>
                <p className="text-[#9DA5B4]/70 mb-8 leading-relaxed">
                  Aprende a construir, usar y monetizar agentes de inteligencia artificial.
                  Automatiza tu trabajo, crea nuevos ingresos y sé parte de la próxima revolución tecnológica.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" asChild>
                    <Link href="/agentic-world" className="flex items-center gap-2">
                      Explorar Agentic World <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/aprende/agentes-ia">Ver el track gratuito</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🤖", title: "Trading Bots", desc: "Automatiza operaciones DeFi" },
                  { icon: "🔍", title: "Research Agents", desc: "Analiza proyectos crypto" },
                  { icon: "💬", title: "Chatbots Web3", desc: "IA para tu proyecto" },
                  { icon: "📊", title: "Analytics IA", desc: "Datos del mercado en tiempo real" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-semibold text-[#F0F1F5] text-sm">{item.title}</div>
                    <div className="text-[#9DA5B4]/50 text-xs mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lo último del hub - Coming Soon */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, #0D1117 0%, #0F1319 50%, #0D1117 100%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-3">Blog</p>
            <h2 className="text-3xl font-bold text-[#F0F1F5] mb-2">Lo último del hub</h2>
            <p className="text-[#9DA5B4]/60 text-sm mb-12">Contenido semanal generado y curado con IA</p>

            <div className="flex flex-col items-center gap-6">
              <div className="text-7xl animate-bounce">🚀</div>
              <div>
                <h3 className="text-2xl font-bold text-[#F0F1F5] mb-2">Pronto...</h3>
                <p className="text-[#9DA5B4]/60 max-w-md">
                  Estamos creando el mejor contenido sobre DeFi, IA y Web3 para Venezuela. Entérate cuando esté listo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,136,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-6">📬</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4">
            El newsletter de DeFi para Venezuela
          </h2>
          <p className="text-[#9DA5B4]/60 mb-10 leading-relaxed">
            Cada semana: noticias del ecosistema crypto, tutoriales prácticos,
            oportunidades DeFi y análisis del mercado. En español venezolano, sin spam.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none transition-colors text-sm"
              style={{
                background: "rgba(22,27,36,0.4)",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            />
            <Button type="submit" className="whitespace-nowrap">
              Suscribirme gratis
            </Button>
          </form>
          <p className="text-[#9DA5B4]/30 text-xs mt-4">
            Sin spam. Cancela cuando quieras. +5,000 venezolanos ya suscritos.
          </p>
        </div>
      </section>

      {/* Comunidades + Eventos + Empleos */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, #0D1117 0%, #0F1319 50%, #0D1117 100%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-3">Ecosistema</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4">
              Venezuela construye en Web3
            </h2>
            <p className="text-[#9DA5B4]/60 max-w-xl mx-auto">
              Comunidades activas, eventos regulares y oportunidades de trabajo en cripto. El ecosistema venezolano no para.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                emoji: "🤝",
                title: "Comunidades",
                href: "/comunidades",
                desc: "Más de 30,000 venezolanos en Discord, Telegram y meetups. La comunidad cripto VZ más grande de LATAM.",
                stat: "30K+ miembros",
                cta: "Ver comunidades",
              },
              {
                icon: Calendar,
                emoji: "📅",
                title: "Eventos",
                href: "/eventos",
                desc: "Hackathons, workshops, meetups y conferencias. Conecta con builders, founders e inversores del ecosistema.",
                stat: "12+ eventos/mes",
                cta: "Ver eventos",
              },
              {
                icon: Briefcase,
                emoji: "💼",
                title: "Empleos Web3",
                href: "/empleos",
                desc: "Trabaja para empresas cripto globales desde Venezuela. 100% remoto, pago en USDC. Tu talento no tiene fronteras.",
                stat: "50+ ofertas activas",
                cta: "Ver empleos",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(22,27,36,0.5) 0%, rgba(13,17,23,0.8) 100%)",
                  border: "1px solid rgba(0,255,136,0.1)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-xs text-[#00FF88] font-medium">{item.stat}</span>
                </div>
                <h3 className="font-bold text-[#F0F1F5] text-lg mb-2 group-hover:text-[#9DA5B4] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-5 flex-1">{item.desc}</p>
                <span className="text-sm text-[#00FF88] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {item.cta} <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas B2B - COMMENTED OUT FOR LATER IMPLEMENTATION */}
      {/*
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, #0D1117 0%, #111827 50%, #0D1117 100%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-6">
                <TrendingUp className="w-3 h-3" />
                Para empresas & startups
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4 leading-tight">
                Herramientas que tu empresa necesita en la era Web3
              </h2>
              <p className="text-[#9DA5B4]/60 mb-8 leading-relaxed">
                Soluciones de IA, analytics de blockchain y automatización
                para startups venezolanas que quieren liderar la transformación digital.
              </p>
              <Button asChild>
                <Link href="/herramientas" className="flex items-center gap-2">
                  Ver herramientas <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📊", title: "DeFi Analytics Dashboard", price: "$99/mes", desc: "Monitorea pools, yields y riesgos en tiempo real." },
                { icon: "🤖", title: "Agentes IA Personalizados", price: "$299/mes", desc: "Automatización inteligente para tu negocio." },
                { icon: "🔐", title: "Compliance Crypto", price: "Consultoría", desc: "Navega la regulación cripto con confianza." },
              ].map((tool, i) => (
                <div
                  key={tool.title}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: i === 1
                      ? "linear-gradient(135deg, #161B24 0%, #0F1319 100%)"
                      : "linear-gradient(135deg, rgba(22,27,36,0.4) 0%, rgba(13,17,23,0.6) 100%)",
                    border: i === 1
                      ? "1px solid rgba(0,255,136,0.3)"
                      : "1px solid rgba(0,255,136,0.1)",
                  }}
                >
                  <div className="text-2xl">{tool.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-[#F0F1F5] text-sm">{tool.title}</h3>
                      <span className="text-[#00FF88] text-xs font-medium">{tool.price}</span>
                    </div>
                    <p className="text-[#9DA5B4]/50 text-xs">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
