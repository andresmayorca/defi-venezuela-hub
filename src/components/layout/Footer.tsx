import Link from "next/link";
import { Zap, X, Send } from "lucide-react";

const footerLinks = {
  Aprende: [
    { label: "Blockchain Básico", href: "/aprende/blockchain" },
    { label: "DeFi 101", href: "/aprende/defi" },
    { label: "Web3 & NFTs", href: "/aprende/web3" },
    { label: "Agentes de IA", href: "/aprende/agentes-ia" },
  ],
  Comunidad: [
    { label: "Comunidades", href: "/comunidades" },
    { label: "Eventos", href: "/eventos" },
    { label: "Empleos Web3", href: "/empleos" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Blog", href: "/blog" },
  ],
  Herramientas: [
    { label: "Protocolos DeFi", href: "/protocolos" },
    { label: "Para Empresas", href: "/herramientas" },
    { label: "Agentic World", href: "/agentic-world" },
    { label: "Academia", href: "/academia" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0D1117] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00FF88] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-[#F0F1F5] text-lg">
                DeFi<span className="text-[#00FF88]">Venezuela</span>
              </span>
            </Link>
            <p className="text-[#9DA5B4]/60 text-sm leading-relaxed max-w-xs">
              El hub de blockchain, Web3, DeFi e Inteligencia Artificial para Venezuela y la diáspora venezolana.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://twitter.com/defivenezuela" target="_blank" rel="noopener noreferrer"
                className="p-2 text-[#9DA5B4]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/10 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </a>
              <a href="https://t.me/defivenezuela" target="_blank" rel="noopener noreferrer"
                className="p-2 text-[#9DA5B4]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/10 rounded-lg transition-all">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@defivenezuela" target="_blank" rel="noopener noreferrer"
                className="p-2 text-[#9DA5B4]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/10 rounded-lg transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[#F0F1F5] font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#9DA5B4]/60 hover:text-[#00FF88] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9DA5B4]/40 text-sm">
            © 2025 DefiVenezuela. Hecho con orgullo venezolano.
          </p>
          <p className="text-[#9DA5B4]/30 text-xs">
            No somos asesores financieros. Siempre DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
