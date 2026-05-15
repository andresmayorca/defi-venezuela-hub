"use client";
import Link from "next/link";
import { useState } from "react";
import { Zap, X, Send, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Aprende", href: "/aprende" },
  { label: "Comunidades", href: "/comunidades" },
  { label: "Eventos", href: "/eventos" },
  { label: "Empleos Web3", href: "/empleos" },
  { label: "Blog", href: "/blog" },
  { label: "Agentic World", href: "/agentic-world" },
];

const resources = [
  { label: "Protocolos DeFi", href: "/protocolos" },
  { label: "Herramientas", href: "/herramientas" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Academia", href: "/academia" },
];

const socials = [
  { href: "https://twitter.com/defivenezuela", icon: X, label: "Twitter/X" },
  { href: "https://t.me/defivenezuela", icon: Send, label: "Telegram" },
  { href: "mailto:hola@defivenezuela.org", icon: Mail, label: "Email" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("¡Suscripción exitosa! Revisa tu email.", { duration: 4000 });
    setEmail("");
    setLoading(false);
  };

  return (
    <footer className="border-t border-white/5 bg-[#0D1117] mt-20 relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00FF88]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + Newsletter — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-[#00FF88] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-[#0D1117] fill-[#0D1117]" />
              </div>
              <span className="font-bold text-[#F0F1F5] text-xl tracking-tight">
                DeFi<span className="text-[#00FF88]">Venezuela</span>
              </span>
            </Link>

            <p className="text-[#9DA5B4]/60 mb-6 max-w-sm text-sm leading-relaxed">
              Construyendo el futuro de las finanzas descentralizadas en
              Venezuela. Conectamos comunidades, developers y entusiastas del
              ecosistema DeFi.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#F0F1F5] text-sm">Newsletter</h4>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="max-w-xs bg-white/5 border-white/10 focus:border-[#00FF88]/40"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "..." : "Suscribirse"}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-[#F0F1F5] text-sm mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#9DA5B4]/50 hover:text-[#00FF88] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-[#F0F1F5] text-sm mb-4">
              Recursos
            </h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    className="text-[#9DA5B4]/50 hover:text-[#00FF88] text-sm transition-colors duration-200"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-[#9DA5B4]/40 text-sm">
              © 2025 DefiVenezuela. Hecho con orgullo venezolano 🇻🇪
            </p>
            <p className="text-[#9DA5B4]/25 text-xs mt-1">
              No somos asesores financieros. Siempre DYOR.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-[#9DA5B4]/50 hover:text-[#00FF88] hover:bg-[#00FF88]/10 rounded-xl transition-all duration-200 border border-transparent hover:border-[#00FF88]/20"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
