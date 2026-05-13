import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";

const categories = [
  {
    emoji: "📖",
    title: "Glosario Web3",
    description: "Todos los términos que necesitas para hablar el idioma del ecosistema.",
    items: [
      { term: "Blockchain", def: "Base de datos distribuida e inmutable que registra transacciones en bloques encadenados." },
      { term: "DeFi", def: "Finanzas Descentralizadas. Servicios financieros sin intermediarios usando smart contracts." },
      { term: "Wallet", def: "Billetera digital que guarda tus claves privadas y te permite interactuar con blockchains." },
      { term: "USDC", def: "Stablecoin vinculada al dólar americano, emitida por Circle. 1 USDC = 1 USD siempre." },
      { term: "Gas", def: "Comisión que pagas para ejecutar transacciones en redes como Ethereum." },
      { term: "Yield Farming", def: "Estrategia de proveer liquidez a protocolos DeFi a cambio de recompensas." },
      { term: "Smart Contract", def: "Contrato auto-ejecutable escrito en código que corre en una blockchain." },
      { term: "DEX", def: "Exchange Descentralizado. Permite intercambiar tokens sin custodia de terceros." },
      { term: "Seed Phrase", def: "12 o 24 palabras que son la llave maestra de tu wallet. NUNCA la compartas." },
      { term: "Liquidity Pool", def: "Par de tokens en un protocolo DeFi que permite intercambios automáticos." },
      { term: "NFT", def: "Token No Fungible. Activo digital único y verificable en blockchain." },
      { term: "DAO", def: "Organización Autónoma Descentralizada. Gobernada por votos de sus miembros." },
    ],
  },
];

const externalResources = [
  {
    category: "Wallets recomendadas",
    items: [
      { name: "MetaMask", desc: "La wallet más popular para Web3 y DeFi", url: "https://metamask.io" },
      { name: "Rabby Wallet", desc: "Alternativa a MetaMask con mejor UX y seguridad", url: "https://rabby.io" },
      { name: "Coinbase Wallet", desc: "Fácil de usar, ideal para principiantes", url: "https://wallet.coinbase.com" },
    ],
  },
  {
    category: "Exploradores de blockchain",
    items: [
      { name: "Etherscan", desc: "Explora transacciones en Ethereum", url: "https://etherscan.io" },
      { name: "Arbiscan", desc: "Explorador de Arbitrum", url: "https://arbiscan.io" },
      { name: "Polygonscan", desc: "Explorador de Polygon", url: "https://polygonscan.com" },
    ],
  },
  {
    category: "Precios y datos de mercado",
    items: [
      { name: "CoinGecko", desc: "Precios y datos de más de 10,000 tokens", url: "https://coingecko.com" },
      { name: "DeFiLlama", desc: "TVL y datos de protocolos DeFi", url: "https://defillama.com" },
      { name: "Dune Analytics", desc: "Analytics on-chain avanzados", url: "https://dune.com" },
    ],
  },
  {
    category: "Aprende más",
    items: [
      { name: "Ethereum.org", desc: "Documentación oficial de Ethereum en español", url: "https://ethereum.org/es" },
      { name: "Bankless", desc: "El mejor newsletter de DeFi en inglés", url: "https://bankless.com" },
      { name: "Finematics", desc: "Videos explicativos de DeFi", url: "https://finematics.com" },
    ],
  },
];

export default function RecursosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Recursos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Recursos</h1>
          <p className="text-xl text-gray-400">
            Glosario, herramientas y links curados para el ecosistema Web3 venezolano.
          </p>
        </div>
      </section>

      {/* Glosario */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">📖 Glosario Web3</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories[0].items.map((item) => (
              <div
                key={item.term}
                className="p-5 rounded-xl border border-white/5 bg-[#13131a] hover:border-amber-500/20 transition-all"
              >
                <h3 className="font-bold text-amber-400 mb-1">{item.term}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links externos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#13131a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-12">🔗 Herramientas y links curados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {externalResources.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">
                  {cat.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0a0a0f] hover:border-amber-500/20 transition-all group"
                    >
                      <div>
                        <h4 className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
