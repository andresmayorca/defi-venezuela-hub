import Link from "next/link";
import { ChevronRight, Users, MessageCircle, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";

const communities = [
  {
    name: "DeFi Venezuela Discord",
    emoji: "🇻🇪",
    platform: "Discord",
    platformIcon: "💬",
    members: "8,200",
    description:
      "El servidor principal de la comunidad DeFi Venezuela. Canales dedicados a DeFi, trading, remesas, Web3 y agentes de IA. Comunidad activa desde 2021.",
    features: ["35+ canales activos", "12 eventos mensuales", "Mentorías 1:1", "Señales DeFi"],
    link: "https://discord.gg/defivenezuela",
    highlight: true,
    badge: null,
  },
  {
    name: "DeFi Venezuela Telegram",
    emoji: "📱",
    platform: "Telegram",
    platformIcon: "✈️",
    members: "12,400",
    description:
      "El grupo más grande de cripto venezolano en Telegram. Noticias del mercado, alertas en tiempo real, discusión de protocolos y oportunidades DeFi.",
    features: ["Alertas de mercado", "Señales de trading", "Noticias cripto", "Soporte P2P"],
    link: "https://t.me/defivenezuela",
    highlight: false,
  },
  {
    name: "Web3 Caracas",
    emoji: "🏙️",
    platform: "Meetup",
    platformIcon: "🤝",
    members: "1,800",
    description:
      "Comunidad presencial y virtual de builders Web3 en Caracas. Hackathons trimestrales, workshops y networking con el ecosistema blockchain venezolano.",
    features: ["Hackathons trimestrales", "Talleres presenciales", "Red de builders", "Demo days"],
    link: "https://meetup.com/web3-caracas",
    highlight: false,
  },
  {
    name: "DeFi Venezuela YouTube",
    emoji: "▶️",
    platform: "YouTube",
    platformIcon: "📹",
    members: "5,600",
    description:
      "Canal educativo con tutoriales sobre DeFi, wallets, protocolos y casos de uso venezolanos. Contenido en español venezolano, completamente gratuito.",
    features: ["Tutoriales DeFi", "Análisis de mercado", "Casos de uso locales", "En español VE"],
    link: "https://youtube.com/@defivenezuela",
    highlight: false,
  },
  {
    name: "DeFi Mujeres Venezuela",
    emoji: "💜",
    platform: "Telegram",
    platformIcon: "✈️",
    members: "2,100",
    description:
      "Comunidad enfocada en la inclusión financiera de la mujer venezolana en Web3. Programa de mentorías, becas de educación y red de soporte.",
    features: ["Programa de becas", "Mentorías gratuitas", "Red de soporte", "Workshops exclusivos"],
    link: "https://t.me/defimujeresvzla",
    highlight: false,
  },
  {
    name: "Diáspora Web3",
    emoji: "🌎",
    platform: "Discord",
    platformIcon: "💬",
    members: "3,900",
    description:
      "Para venezolanos en el exterior que quieren usar DeFi para remesas y pagos. Guías para enviar dinero a Venezuela con USDC y conectarse con la comunidad.",
    features: ["Guías de remesas", "Red global VZ", "Oportunidades cripto", "P2P Exchange VZ"],
    link: "https://discord.gg/diasporaweb3",
    highlight: false,
  },
];

const platforms = [
  { name: "Discord", count: 2, icon: "💬", color: "text-[#5865F2]" },
  { name: "Telegram", count: 2, icon: "✈️", color: "text-[#2AABEE]" },
  { name: "YouTube", count: 1, icon: "📹", color: "text-red-500" },
  { name: "Meetup", count: 1, icon: "🤝", color: "text-[#ED1C40]" },
];

export default function ComunidadesPage() {
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
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Comunidades</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Más de 30,000 venezolanos en Web3
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              La comunidad cripto venezolana{" "}
              <span className="text-[#00FF88]">más grande</span>
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Únete a comunidades donde venezolanos aprenden, comparten y construyen en Web3.
              Dentro y fuera del país, la diáspora cripto venezolana no para de crecer.
            </p>
          </div>
        </div>
      </section>

      {/* Stats de plataformas */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#161B24]/20">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className={`text-sm font-semibold ${p.color}`}>{p.name}</div>
                  <div className="text-xs text-[#9DA5B4]/50">{p.count} comunidad{p.count > 1 ? "es" : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de comunidades */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communities.map((community) => (
              <div
                key={community.name}
                className="flex flex-col p-6 rounded-2xl transition-all duration-300 group"
                style={{
                  background: community.highlight
                    ? "linear-gradient(135deg, #161B24 0%, #0F1319 100%)"
                    : "linear-gradient(135deg, rgba(22,27,36,0.4) 0%, rgba(13,17,23,0.6) 100%)",
                  border: community.highlight
                    ? "1px solid rgba(0,255,136,0.4)"
                    : "1px solid rgba(0,255,136,0.1)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{community.emoji}</span>
                    <div>
                      <h3 className="font-bold text-[#F0F1F5] text-lg">{community.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">{community.platformIcon}</span>
                        <span className="text-xs text-[#9DA5B4]/50">{community.platform}</span>
                        <span className="text-[#9DA5B4]/20">·</span>
                        <Users className="w-3 h-3 text-[#00FF88]" />
                        <span className="text-xs text-[#00FF88] font-medium">{community.members}</span>
                      </div>
                    </div>
                  </div>
                  {community.highlight && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 font-medium">
                      Principal
                    </span>
                  )}
                </div>

                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-5 flex-1">
                  {community.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {community.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-[#9DA5B4]/60">
                      <span className="w-1 h-1 rounded-full bg-[#00FF88] flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium opacity-60 cursor-not-allowed"
                  style={{
                    background: community.highlight ? "rgba(0,255,136,0.1)" : "rgba(0,255,136,0.05)",
                    border: "1px solid rgba(0,255,136,0.15)",
                    color: "#00FF88",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                  Próximamente
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comunidades aliadas en LATAM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-2">Red LATAM</p>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              Comunidades aliadas en Latinoamérica
            </h2>
            <p className="text-[#9DA5B4]/60 max-w-2xl text-sm leading-relaxed">
              El movimiento DeFi en LATAM es regional. Estas son las comunidades hermanas con las que colaboramos
              para llevar Web3 a todo el continente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-5 max-w-lg">
            {/* DeFi México — comunidad aliada destacada */}
            <div
              className="relative flex flex-col p-6 rounded-2xl overflow-hidden group hover:scale-[1.01] transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #161B24 0%, #0F1319 100%)",
                border: "1px solid rgba(0,255,136,0.35)",
                boxShadow: "0 0 40px rgba(0,255,136,0.06)",
              }}
            >
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00FF88]/6 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇲🇽</span>
                  <div>
                    <h3 className="font-bold text-[#F0F1F5] text-lg">DeFi México</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#9DA5B4]/50">Hub Web3</span>
                      <span className="text-[#9DA5B4]/20">·</span>
                      <Users className="w-3 h-3 text-[#00FF88]" />
                      <span className="text-xs text-[#00FF88] font-medium">15,000+</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/25 font-medium">
                  Aliado
                </span>
              </div>

              <p className="relative text-[#9DA5B4]/60 text-sm leading-relaxed mb-4 flex-1">
                La comunidad DeFi más grande de México y una de las más activas de LATAM.
                Hub de educación, trading con IA (Bobby CIO), agentes autónomos, comunidades y empleos Web3.
                Inspiración directa de DeFi Venezuela. Open source bajo licencia MIT.
              </p>

              <div className="relative grid grid-cols-2 gap-2 mb-5">
                {["Bobby AI CIO", "Agentes autónomos", "Eventos mensuales", "Open source MIT"].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-[#9DA5B4]/60">
                    <span className="w-1 h-1 rounded-full bg-[#00FF88] flex-shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <a
                href="https://defimexico.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                style={{
                  background: "rgba(0,255,136,0.15)",
                  border: "1px solid rgba(0,255,136,0.3)",
                  color: "#00FF88",
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Visitar DeFi México
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* CTA - Proponer comunidad */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-3xl border border-[#00FF88]/20"
            style={{ background: "linear-gradient(135deg, rgba(22,27,36,0.5) 0%, rgba(13,17,23,0.8) 100%)" }}>
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              ¿Tienes una comunidad cripto venezolana?
            </h2>
            <p className="text-[#9DA5B4]/60 mb-6 text-sm leading-relaxed">
              Si lideras una comunidad activa de venezolanos en Web3, queremos incluirte aquí.
              Escríbenos y la añadimos al directorio.
            </p>
            <Button asChild>
              <a href="mailto:contacto@defivenezuela.com" className="flex items-center gap-2 justify-center">
                Proponer mi comunidad
                <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
