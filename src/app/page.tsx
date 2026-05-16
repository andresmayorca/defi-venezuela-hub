"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, Users, Calendar, Briefcase, BookOpen, Mail,
  BarChart3, Trophy, Rocket, Zap, Sparkles, Bot, Globe, Shield, Wrench,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { LatestBlogClient } from "@/components/sections/LatestBlogClient";
import { toast } from "sonner";

/* ── Ecosystem module cards ─────────────────────────────────────────── */
const modules = [
  {
    icon: Rocket,
    title: "Startups & Proyectos",
    description: "Los mejores proyectos DeFi construidos por venezolanos. Conoce el ecosistema en crecimiento.",
    href: "/startup",
    color: "text-white/60",
    bg: "bg-white/[0.05]",
    span: "md:col-span-2",
    cta: "Ver proyectos",
  },
  {
    icon: Users,
    title: "Comunidades",
    description: "30K+ venezolanos en Discord, Telegram y meetups.",
    href: "/comunidades",
    color: "text-white/60",
    bg: "bg-white/[0.05]",
    span: "",
    cta: "Ver comunidades",
  },
  {
    icon: Calendar,
    title: "Eventos",
    description: "Hackathons, workshops y meetups en el ecosistema.",
    href: "/eventos",
    color: "text-white/60",
    bg: "bg-white/[0.05]",
    span: "",
    cta: "Ver eventos",
  },
  {
    icon: Briefcase,
    title: "Empleos Web3",
    description: "100% remoto. Paga en USDC. Tu talento no tiene fronteras.",
    href: "/empleos",
    color: "text-amber-400/60",
    bg: "bg-amber-500/10",
    span: "",
    cta: "Ver empleos",
  },
  {
    icon: BookOpen,
    title: "Blog & Aprende",
    description: "Contenido DeFi, IA y Web3 en español venezolano.",
    href: "/blog",
    color: "text-violet-400/60",
    bg: "bg-violet-500/10",
    span: "",
    cta: "Leer artículos",
  },
  {
    icon: Trophy,
    title: "Hackathon MVPs",
    description: "Proyectos construidos en competencias. El futuro de Venezuela en Web3.",
    href: "/hackathon",
    color: "text-green-400/60",
    bg: "bg-green-500/10",
    span: "md:col-span-2",
    cta: "Ver proyectos",
  },
];

const features = [
  { icon: BookOpen, title: "Aprende a tu ritmo", description: "Desde cero hasta avanzado, pensado para el contexto venezolano." },
  { icon: Bot, title: "IA + Blockchain", description: "El único hub en Venezuela que combina agentes de IA con el ecosistema DeFi." },
  { icon: Wrench, title: "Herramientas reales", description: "Accede a herramientas que puedes usar hoy para proteger tu capital." },
  { icon: Users, title: "Comunidad activa", description: "Miles de venezolanos aprendiendo y construyendo juntos en Web3." },
  { icon: Shield, title: "USDC & Remesas", description: "Cómo recibir remesas en USDC y escapar de la inflación." },
  { icon: Globe, title: "Diáspora conectada", description: "Venezuela dentro y fuera. Conectamos a la diáspora con DeFi." },
];

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("¡Suscripción exitosa! Revisa tu email.", { duration: 4000 });
    setEmail("");
    setLoading(false);
  };

  return (
    <GlassCard className="p-8 md:p-12 text-center">
      <h2 className="font-display text-2xl md:text-3xl text-white mb-4">
        <ScrambleText text="El newsletter DeFi de Venezuela" speed={25} iterations={10} />
      </h2>
      <p className="text-white/40 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
        Cada semana: noticias del ecosistema crypto, tutoriales prácticos,
        oportunidades DeFi y análisis del mercado. En español venezolano, sin spam.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/20 rounded-full px-5 focus:border-white/20"
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-medium rounded-full px-8 hover:bg-white/90 border-0"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <><Mail className="mr-2 w-4 h-4" />Suscribirme</>
          )}
        </Button>
      </form>
      <p className="text-white/20 text-xs mt-4">Sin spam. +5,000 venezolanos ya suscritos.</p>
    </GlassCard>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(201, 100%, 6%)" }}>

      {/* ══ HERO with VIDEO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 40%, hsl(201,100%,6%))" }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-32">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass mb-8 animate-fade-rise">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/70 uppercase tracking-wider">
              El Hub DeFi de Venezuela 🇻🇪
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2px] max-w-6xl font-normal font-display animate-fade-rise text-white mb-0">
            <ScrambleText text="Conecta, Aprende" speed={20} iterations={12} />
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2px] max-w-6xl font-normal font-display animate-fade-rise text-white/40 mt-2">
            <ScrambleText text="y Construye en DeFi" speed={20} iterations={15} />
          </h1>

          <p className="text-white/40 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            La plataforma que reúne comunidades, eventos, empleos y oportunidades
            del ecosistema DeFi venezolano en un solo lugar.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-fade-rise-delay-2">
            <Link
              href="/aprende"
              className="liquid-glass rounded-full px-10 py-4 text-base text-white hover:scale-[1.03] transition-transform flex items-center gap-2"
            >
              <Rocket className="w-[18px] h-[18px]" />
              Explorar el ecosistema
            </Link>
            <Link
              href="/unirse"
              className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Únete a la comunidad
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CONTENT AREA ═════════════════════════════════════════════════ */}
      <div className="relative z-10">

        {/* ── Agentic World ──────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 md:p-12">
              <div className="space-y-6">
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-amber-400 uppercase tracking-wider">NUEVO</span>
                </div>

                <h2 className="font-display text-3xl md:text-5xl text-white leading-tight">
                  <ScrambleText text="Venezuela entra a la era de los" speed={20} iterations={12} />
                </h2>
                <h2 className="font-display text-3xl md:text-5xl text-amber-400/80 leading-tight">
                  <ScrambleText text="Agentes de Inteligencia Artificial" speed={20} iterations={15} />
                </h2>

                <p className="text-white/40 text-sm md:text-base max-w-2xl">
                  Aprende a construir, usar y monetizar agentes de IA.
                  Automatiza tu trabajo, crea nuevos ingresos y sé parte de la próxima revolución tecnológica.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-lg">
                  {[
                    { label: "Comunidad", value: "10K+" },
                    { label: "Recursos", value: "50+" },
                    { label: "Tracks", value: "4" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4">
                      <div className="text-[10px] text-white/40 uppercase">{stat.label}</div>
                      <div className="text-xl font-display text-amber-300 mt-1">
                        <ScrambleText text={stat.value} speed={30} iterations={6} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/agentic-world"
                    className="flex items-center gap-2 px-6 py-3.5 bg-green-500 text-black text-sm font-bold rounded-full hover:scale-[1.03] transition-transform"
                  >
                    EXPLORAR AGENTIC WORLD <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/aprende/agentes-ia"
                    className="flex items-center gap-2 px-6 py-3.5 liquid-glass rounded-full text-amber-300 text-sm font-medium hover:scale-[1.03] transition-transform"
                  >
                    <Sparkles className="w-4 h-4" /> VER TRACK GRATUITO
                  </Link>
                  <Link
                    href="/comunidades"
                    className="flex items-center gap-2 px-6 py-3.5 liquid-glass rounded-full text-[#00D4FF] text-sm font-medium hover:scale-[1.03] transition-transform"
                  >
                    COMUNIDADES
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Ecosystem Modules ──────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display text-white mb-8">
              <ScrambleText text="El Ecosistema Venezolano" speed={25} iterations={8} />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((mod) => (
                <GlassCard key={mod.title} className={`p-6 space-y-4 ${mod.span}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mod.bg}`}>
                    <mod.icon className={`${mod.color}`} size={20} />
                  </div>
                  <h3 className="text-xl font-display text-white">{mod.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{mod.description}</p>
                  <Link
                    href={mod.href}
                    className={`${mod.color} hover:text-white text-sm flex items-center gap-1 transition-colors`}
                  >
                    {mod.cta} <ArrowRight size={14} />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why DefiVenezuela ──────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display text-white">
                <ScrambleText text="Hecho para la realidad venezolana" speed={25} iterations={8} />
              </h2>
              <p className="text-white/40 text-sm mt-2">
                No es contenido traducido. Es contenido creado pensando en la inflación, las remesas y los sueños venezolanos.
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <GlassCard className="p-6 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                      <f.icon className="text-white/60" size={20} />
                    </div>
                    <h3 className="font-display text-lg text-white">{f.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Blog / Aprende ─────────────────────────────────────────── */}
        <LatestBlogClient />

        {/* ── Metrics CTA ────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/protocolos">
              <GlassCard className="flex flex-col md:flex-row items-center gap-6 p-8 group">
                <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                  <BarChart3 className="text-white/60" size={28} />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl font-display text-white group-hover:text-[#00FF88] transition-colors mb-1">
                    Protocolos DeFi para Venezuela
                  </h3>
                  <p className="text-white/40 text-sm">
                    Los mejores protocolos para ahorrar, ganar rendimientos y moverse en cripto desde Venezuela.
                  </p>
                </div>
                <ArrowRight className="text-white/40 group-hover:translate-x-2 transition-transform" size={24} />
              </GlassCard>
            </Link>
          </div>
        </section>

        {/* ── Newsletter ─────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <NewsletterSection />
          </div>
        </section>

      </div>
    </div>
  );
}
