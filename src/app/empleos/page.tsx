import Link from "next/link";
import { ChevronRight, Briefcase, Globe, DollarSign, ExternalLink, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

const jobs = [
  {
    title: "Solidity Developer",
    company: "Aave",
    companyEmoji: "👻",
    location: "Remote",
    salary: "$80K – $130K USD",
    type: "Full-time",
    tags: ["Solidity", "DeFi", "EVM", "Smart Contracts"],
    description:
      "Aave busca desarrolladores Solidity para construir la próxima generación de protocolos de préstamos descentralizados. Experiencia con EVM requerida.",
    posted: "hace 2 días",
    link: "#",
    featured: true,
  },
  {
    title: "Frontend Engineer Web3",
    company: "Uniswap Labs",
    companyEmoji: "🦄",
    location: "Remote",
    salary: "$70K – $110K USD",
    type: "Full-time",
    tags: ["React", "TypeScript", "Web3.js", "wagmi"],
    description:
      "Uniswap Labs busca engineers frontend con experiencia en integración de wallets y dApps para mejorar la experiencia de usuario de su DEX líder.",
    posted: "hace 5 días",
    link: "#",
    featured: false,
  },
  {
    title: "Community Manager Venezuela",
    company: "Binance",
    companyEmoji: "🟡",
    location: "Venezuela / Remote",
    salary: "$2,000 – $3,500 USD/mes",
    type: "Full-time",
    tags: ["Community", "Español", "Social Media", "Cripto"],
    description:
      "Binance busca un Community Manager venezolano para gestionar la comunidad hispanohablante, crear contenido educativo y soporte en español.",
    posted: "hace 1 semana",
    link: "#",
    featured: false,
  },
  {
    title: "DeFi Research Analyst",
    company: "Messari",
    companyEmoji: "📊",
    location: "Remote",
    salary: "$60K – $90K USD",
    type: "Full-time",
    tags: ["Análisis", "DeFi", "On-chain", "Investigación"],
    description:
      "Messari busca analistas de investigación DeFi con capacidad de análisis on-chain, modelado financiero y escritura técnica. Inglés avanzado requerido.",
    posted: "hace 1 semana",
    link: "#",
    featured: false,
  },
  {
    title: "Smart Contract Auditor",
    company: "Trail of Bits",
    companyEmoji: "🔐",
    location: "Remote",
    salary: "$90K – $150K USD",
    type: "Full-time",
    tags: ["Solidity", "Seguridad", "Auditoría", "Rust"],
    description:
      "Trail of Bits busca auditores de smart contracts con experiencia en Solidity y herramientas de análisis estático. Una de las posiciones mejor pagadas en Web3.",
    posted: "hace 2 semanas",
    link: "#",
    featured: false,
  },
  {
    title: "Growth Marketing DeFi",
    company: "Curve Finance",
    companyEmoji: "🔵",
    location: "Remote",
    salary: "$50K – $80K USD",
    type: "Full-time",
    tags: ["Marketing", "DeFi", "Growth", "Crypto"],
    description:
      "Curve busca un growth marketer con experiencia en protocolos DeFi y comunidades cripto para expandir su presencia en Latinoamérica.",
    posted: "hace 2 semanas",
    link: "#",
    featured: false,
  },
  {
    title: "Node.js Backend para dApp",
    company: "Startup Venezolana (confidencial)",
    companyEmoji: "🇻🇪",
    location: "Venezuela / Remote",
    salary: "$800 – $1,500 USD/mes",
    type: "Full-time",
    tags: ["Node.js", "PostgreSQL", "Web3", "Venezuela"],
    description:
      "Startup venezolana construyendo una plataforma DeFi local busca backend developer. Pago en USDC. Equipo 100% venezolano con visión global.",
    posted: "hace 3 días",
    link: "#",
    featured: false,
  },
  {
    title: "Instructor DeFi / Contenido",
    company: "DeFi Venezuela Hub",
    companyEmoji: "🌐",
    location: "Venezuela / Remote",
    salary: "$500 – $1,200 USD/mes",
    type: "Part-time",
    tags: ["Educación", "DeFi", "Contenido", "Español"],
    description:
      "DeFi Venezuela busca instructores y creadores de contenido educativo sobre blockchain, DeFi y agentes IA. Experiencia docente o divulgación técnica deseable.",
    posted: "hace 4 días",
    link: "#",
    featured: false,
  },
];

const categories = [
  { label: "Todos", count: 8 },
  { label: "Desarrollo", count: 3 },
  { label: "Análisis", count: 2 },
  { label: "Marketing", count: 1 },
  { label: "Comunidad", count: 1 },
  { label: "Educación", count: 1 },
];

const salaryRanges = [
  { range: "$500 – $2K/mes", segment: "Junior / Freelance", emoji: "🌱" },
  { range: "$2K – $5K/mes", segment: "Semi-senior", emoji: "🚀" },
  { range: "$5K – $10K+/mes", segment: "Senior / Lead", emoji: "⭐" },
];

export default function EmpleosPage() {
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
            <span className="text-[#9DA5B4]">Empleos Web3</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              Empleos en Web3
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              Tu próximo trabajo{" "}
              <span className="text-[#00FF88]">es en Web3</span>
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Aquí podrás explorar acerca de empleos Web3. Oportunidades reales en el ecosistema cripto, trabajo 100% remoto y pago en USDC.
            </p>
          </div>
        </div>
      </section>

      {/* Rangos salariales - COMMENTED OUT FOR LATER IMPLEMENTATION */}
      {/*
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {salaryRanges.map((s) => (
              <div key={s.segment} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#161B24]/20">
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="font-semibold text-[#F0F1F5] text-sm">{s.segment}</div>
                  <div className="text-[#00FF88] text-sm font-medium">{s.range}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros + Lista - COMMENTED OUT FOR LATER IMPLEMENTATION */}
      {/*
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Categorías */}
          {/* <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: i === 0 ? "rgba(0,255,136,0.2)" : "rgba(22,27,36,0.4)",
                  border: i === 0 ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(0,255,136,0.1)",
                  color: i === 0 ? "#00FF88" : "rgba(157,165,180,0.6)",
                }}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-60">{cat.count}</span>
              </button>
            ))}
          </div> */}

          {/* Job listings */}
          {/* <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job.title + job.company}
                className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl transition-all duration-300 group"
                style={{
                  background: job.featured
                    ? "linear-gradient(135deg, #161B24 0%, #0F1319 100%)"
                    : "linear-gradient(135deg, rgba(22,27,36,0.3) 0%, rgba(13,17,23,0.5) 100%)",
                  border: job.featured
                    ? "1px solid rgba(0,255,136,0.4)"
                    : "1px solid rgba(0,255,136,0.08)",
                }}
              >
                {/* Company emoji */}
                {/* <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/15 flex items-center justify-center text-2xl">
                  {job.companyEmoji}
                </div> */}

                {/* Content */}
                {/* <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-[#F0F1F5] text-lg leading-tight">{job.title}</h3>
                      <div className="text-sm text-[#9DA5B4]/60 mt-0.5">{job.company}</div>
                    </div>
                    {job.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 font-medium">
                        Destacado
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-3 text-xs text-[#9DA5B4]/50">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-[#00FF88]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-[#00FF88]" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-[#00FF88]" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#00FF88]" />
                      {job.posted}
                    </span>
                  </div>

                  <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-4">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-[#00FF88]/10 text-[#9DA5B4]/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={job.link}
                      className="flex items-center gap-1.5 text-sm font-medium text-[#00FF88] hover:text-[#9DA5B4] transition-colors ml-auto"
                    >
                      Ver oferta
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        {/* </div>
      </section> */}

      {/* Tips para venezolanos - COMMENTED OUT FOR LATER IMPLEMENTATION */}
      {/*
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8">
            Cómo conseguir trabajo en Web3 siendo venezolano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                emoji: "🎓",
                title: "Aprende los fundamentos",
                desc: "Empieza con Solidity, JavaScript y DeFi basics. Nuestro track de aprendizaje gratuito es el mejor punto de partida.",
              },
              {
                emoji: "🛠️",
                title: "Construye un portfolio",
                desc: "Clona protocolos, hackea en hackathons, contribuye a open source. GitHub es tu CV en Web3.",
              },
              {
                emoji: "🌐",
                title: "Cobra en USDC",
                desc: "La mayoría de empresas cripto pagan en stablecoins. Aprende a recibir USDC sin comisiones abusivas.",
              },
            ].map((tip) => (
              <div key={tip.title} className="p-6 rounded-2xl border border-white/5 bg-[#0D1117]">
                <div className="text-3xl mb-4">{tip.emoji}</div>
                <h3 className="font-bold text-[#F0F1F5] mb-2">{tip.title}</h3>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/aprende" className="flex items-center gap-2 justify-center">
                Empezar a aprender gratis
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA - Publicar empleo */}
      {/*
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-3xl border border-[#00FF88]/20"
            style={{ background: "linear-gradient(135deg, rgba(22,27,36,0.5) 0%, rgba(13,17,23,0.8) 100%)" }}>
            <div className="text-4xl mb-4">💼</div>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              ¿Buscas talento Web3 venezolano?
            </h2>
            <p className="text-[#9DA5B4]/60 mb-6 text-sm leading-relaxed">
              Venezuela tiene algunos de los mejores developers de Latinoamérica. Publica tu oferta
              aquí y llega a miles de venezolanos capacitados en DeFi y Web3.
            </p>
            <Button asChild>
              <a href="mailto:empleos@defivenezuela.com" className="flex items-center gap-2 justify-center">
                Publicar oferta
                <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
