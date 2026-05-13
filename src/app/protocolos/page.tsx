import Link from "next/link";
import { ChevronRight, Shield, TrendingUp, ExternalLink, Zap } from "lucide-react";

const protocols = [
  {
    name: "Aave",
    emoji: "👻",
    category: "Préstamos",
    tvl: "$12.4B",
    chain: "Multi-chain",
    description:
      "El protocolo de préstamos DeFi más grande. Deposita USDC para ganar intereses o pide prestado con colateral. Seguro, auditado y con años de historial.",
    useCase: "Ganar intereses con tus stablecoins o acceder a liquidez sin vender tus activos.",
    risk: "Bajo",
    link: "https://aave.com",
    tags: ["Préstamos", "Stablecoins", "Intereses"],
    venezuelaNote: "Ideal para guardar USDC y ganar ~4-8% APY en lugar de tenerlo parado.",
  },
  {
    name: "Uniswap",
    emoji: "🦄",
    category: "DEX",
    tvl: "$6.2B",
    chain: "Multi-chain",
    description:
      "El exchange descentralizado más usado del mundo. Intercambia cualquier token ERC-20 sin intermediarios. Sin KYC, sin cuenta, sin permisos.",
    useCase: "Cambiar USDC por otros tokens o proveer liquidez para ganar comisiones.",
    risk: "Bajo-Medio",
    link: "https://uniswap.org",
    tags: ["DEX", "Trading", "Liquidez"],
    venezuelaNote: "Perfecto para convertir remesas USDC a otros activos sin ir a un exchange centralizado.",
  },
  {
    name: "Curve Finance",
    emoji: "🔵",
    category: "DEX Stablecoins",
    tvl: "$2.1B",
    chain: "Multi-chain",
    description:
      "DEX especializado en stablecoins con los fees más bajos. Intercambia entre USDC, USDT, DAI con mínimo slippage. Ideal para mover grandes volúmenes.",
    useCase: "Convertir entre stablecoins (USDC ↔ USDT ↔ DAI) con fees ultra-bajos.",
    risk: "Bajo",
    link: "https://curve.fi",
    tags: ["Stablecoins", "DEX", "Bajo costo"],
    venezuelaNote: "Para venezolanos que reciben remesas en diferentes stablecoins, Curve ofrece el mejor cambio.",
  },
  {
    name: "Compound",
    emoji: "🏦",
    category: "Préstamos",
    tvl: "$800M",
    chain: "Ethereum",
    description:
      "Protocolo pionero de préstamos en Ethereum. Deposita activos para ganar COMP tokens además del interés base. Uno de los protocolos más auditados.",
    useCase: "Ahorros DeFi con rendimiento automático sin custodios ni bancos.",
    risk: "Bajo",
    link: "https://compound.finance",
    tags: ["Ahorro", "Préstamos", "COMP"],
    venezuelaNote: "Alternativa a bancos venezolanos: guarda USDC, gana intereses en dólares reales.",
  },
  {
    name: "Lido",
    emoji: "🌊",
    category: "Liquid Staking",
    tvl: "$28B",
    chain: "Ethereum",
    description:
      "Liquid staking de Ethereum. Haz staking de ETH y recibe stETH que sigue generando rendimiento mientras permanece líquido. El protocolo más grande de DeFi.",
    useCase: "Ganar rendimiento con ETH (~4% APY) sin bloquearlo o comprar stETH directamente.",
    risk: "Bajo-Medio",
    link: "https://lido.fi",
    tags: ["Staking", "ETH", "Rendimiento"],
    venezuelaNote: "Para venezolanos con ETH, Lido es la forma más segura de generar ingresos pasivos.",
  },
  {
    name: "Maker / Sky",
    emoji: "⚗️",
    category: "CDP / Stablecoins",
    tvl: "$5.3B",
    chain: "Ethereum",
    description:
      "El protocolo que creó DAI, la stablecoin descentralizada más importante. Bloquea colateral y genera DAI. También ofrece DSR (interés sobre DAI depositado).",
    useCase: "Acceder a liquidez en DAI usando ETH como colateral. Guardar DAI en DSR para ~5% APY.",
    risk: "Medio",
    link: "https://sky.money",
    tags: ["DAI", "CDP", "Stablecoin"],
    venezuelaNote: "DAI es una stablecoin descentralizada que ningún gobierno puede congelar. Crucial para venezolanos.",
  },
  {
    name: "Hyperliquid",
    emoji: "⚡",
    category: "Perpetuales",
    tvl: "$2.8B",
    chain: "HyperEVM",
    description:
      "La bolsa de futuros perpetuos más rápida en DeFi. Trading de alta velocidad on-chain con apalancamiento, sin KYC y sin custodia de activos.",
    useCase: "Trading activo de criptos con apalancamiento usando USDC como colateral.",
    risk: "Alto",
    link: "https://hyperliquid.xyz",
    tags: ["Perpetuales", "Trading", "Leverage"],
    venezuelaNote: "Para traders venezolanos: el mejor DEX para futuros. Sin KYC, pago en USDC.",
  },
  {
    name: "Pendle Finance",
    emoji: "📐",
    category: "Yield Trading",
    tvl: "$1.4B",
    chain: "Multi-chain",
    description:
      "Protocolo innovador que permite comprar y vender rendimiento futuro de activos DeFi. Ideal para fijar APYs altos o especular sobre tasas de interés.",
    useCase: "Fijar un APY alto de Lido o Aave por adelantado, o comprar rendimiento con descuento.",
    risk: "Medio",
    link: "https://pendle.finance",
    tags: ["Yield", "Innovador", "Avanzado"],
    venezuelaNote: "Para usuarios avanzados que quieren maximizar sus rendimientos en stablecoins.",
  },
];

const categories = ["Todos", "Préstamos", "DEX", "Stablecoins", "Liquid Staking", "Perpetuales", "Yield Trading"];

const riskColors: Record<string, string> = {
  Bajo: "text-green-400 bg-green-400/10 border border-green-400/20",
  "Bajo-Medio": "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
  Medio: "text-orange-400 bg-orange-400/10 border border-orange-400/20",
  Alto: "text-red-400 bg-red-400/10 border border-red-400/20",
};

export default function ProtocolosPage() {
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
            <span className="text-[#9DA5B4]">Protocolos DeFi</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Los protocolos que Venezuela necesita conocer
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              Protocolos DeFi{" "}
              <span className="text-[#00FF88]">curados para venezolanos</span>
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              No todos los protocolos DeFi son relevantes para Venezuela. Aquí encontrarás los más
              útiles con contexto local: cómo usarlos, para qué sirven y qué riesgo tienen.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl">
            {[
              { label: "Protocolos curados", value: "8" },
              { label: "TVL total cubierto", value: "$58B+" },
              { label: "Chains soportadas", value: "12+" },
              { label: "Riesgo evaluado", value: "✓" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-[#161B24]/20 text-center">
                <div className="text-2xl font-bold text-[#00FF88]">{stat.value}</div>
                <div className="text-xs text-[#9DA5B4]/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aviso de riesgo */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/15 text-sm text-yellow-400/80">
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Nota de riesgo:</strong> DeFi implica riesgos de smart contracts, liquidez y mercado.
              Investiga antes de invertir. La información aquí es educativa, no asesoría financiera.
            </span>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: i === 0 ? "rgba(0,255,136,0.2)" : "rgba(22,27,36,0.4)",
                  border: i === 0 ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(0,255,136,0.1)",
                  color: i === 0 ? "#00FF88" : "rgba(157,165,180,0.6)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de protocolos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className="flex flex-col p-6 rounded-2xl border border-[#00FF88]/10 bg-gradient-to-br from-[#161B24]/30 to-[#0D1117]/60 hover:border-[#00FF88]/20 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{protocol.emoji}</span>
                    <div>
                      <h3 className="font-bold text-[#F0F1F5] text-xl">{protocol.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#9DA5B4]/50">{protocol.category}</span>
                        <span className="text-[#9DA5B4]/20">·</span>
                        <span className="text-xs text-[#9DA5B4]/50">{protocol.chain}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-[#00FF88]">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold">{protocol.tvl}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColors[protocol.risk]}`}>
                      Riesgo {protocol.risk}
                    </span>
                  </div>
                </div>

                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-4">{protocol.description}</p>

                {/* Venezuela Note */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#00FF88]/8 border border-[#00FF88]/15 mb-4">
                  <span className="text-sm">🇻🇪</span>
                  <p className="text-xs text-[#9DA5B4]/70 leading-relaxed">{protocol.venezuelaNote}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {protocol.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-[#00FF88]/10 text-[#9DA5B4]/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={protocol.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium mt-auto transition-all duration-200"
                  style={{
                    background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    color: "#00FF88",
                  }}
                >
                  Ir al protocolo
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por dónde empezar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              ¿Por dónde empieza un venezolano en DeFi?
            </h2>
            <p className="text-[#9DA5B4]/60 max-w-2xl mx-auto text-sm">
              Recomendación práctica según tu objetivo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                emoji: "💰",
                goal: "Guardar ahorros en USD",
                path: "Aave o Compound",
                desc: "Deposita USDC y gana 4-8% APY. Mucho mejor que cualquier banco venezolano.",
              },
              {
                emoji: "📤",
                goal: "Recibir remesas sin comisiones",
                path: "Circle + Uniswap",
                desc: "Recibe USDC directo a tu wallet. Convierte a lo que necesites con Uniswap.",
              },
              {
                emoji: "📈",
                goal: "Generar ingresos pasivos",
                path: "Lido + Pendle",
                desc: "Haz staking de ETH en Lido, optimiza rendimientos con Pendle Finance.",
              },
            ].map((path) => (
              <div key={path.goal} className="p-6 rounded-2xl border border-white/5 bg-[#0D1117]">
                <div className="text-3xl mb-3">{path.emoji}</div>
                <div className="text-xs text-[#00FF88] font-semibold uppercase tracking-wider mb-1">
                  Objetivo: {path.goal}
                </div>
                <h3 className="font-bold text-[#F0F1F5] mb-2">{path.path}</h3>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed">{path.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/aprende/defi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "rgba(0,255,136,0.15)",
                border: "1px solid rgba(0,255,136,0.25)",
                color: "#00FF88",
              }}
            >
              Aprende DeFi paso a paso
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
