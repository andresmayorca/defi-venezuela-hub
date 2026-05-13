"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Zap, ChevronDown, Newspaper, Bot, Wrench, GraduationCap, Users, Calendar, Briefcase, Globe, User, LogOut } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const aprendeItems = [
  {
    href: "/aprende",
    icon: GraduationCap,
    label: "Todos los tracks",
    desc: "Blockchain, DeFi, Web3 y Agentes IA",
  },
  {
    href: "/blog",
    icon: Newspaper,
    label: "Blog",
    desc: "Web3, DeFi, Tecnología, Acciones y más",
  },
  {
    href: "/protocolos",
    icon: Globe,
    label: "Protocolos DeFi",
    desc: "Los mejores protocolos para venezolanos",
  },
];

const comunidadItems = [
  {
    href: "/comunidades",
    icon: Users,
    label: "Comunidades",
    desc: "Discord, Telegram y más",
  },
  {
    href: "/eventos",
    icon: Calendar,
    label: "Eventos",
    desc: "Hackathons, meetups y workshops",
  },
  {
    href: "/empleos",
    icon: Briefcase,
    label: "Empleos Web3",
    desc: "Trabaja en cripto, cobra en USDC",
  },
];

const mainLinks = [
  { href: "/agentic-world", label: "Agentic World" },
  { href: "/herramientas", label: "Herramientas" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aprendeOpen, setAprendeOpen] = useState(false);
  const [comunidadOpen, setComunidadOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const aprendeRef = useRef<HTMLDivElement>(null);
  const comunidadRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkAuth();

    function handleClickOutside(e: MouseEvent) {
      if (aprendeRef.current && !aprendeRef.current.contains(e.target as Node)) {
        setAprendeOpen(false);
      }
      if (comunidadRef.current && !comunidadRef.current.contains(e.target as Node)) {
        setComunidadOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [supabase]);

  function closeAll() {
    setOpen(false);
    setAprendeOpen(false);
    setComunidadOpen(false);
    setUserOpen(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeAll();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0D1117]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeAll}>
            <div className="w-8 h-8 rounded-lg bg-[#00FF88] flex items-center justify-center group-hover:bg-[#00e67a] transition-colors">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-[#F0F1F5] text-lg">
              DeFi<span className="text-[#00FF88]">Venezuela</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Aprende dropdown */}
            <div className="relative" ref={aprendeRef}>
              <button
                onClick={() => { setAprendeOpen(!aprendeOpen); setComunidadOpen(false); setUserOpen(false); }}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all",
                  aprendeOpen
                    ? "text-[#F0F1F5] bg-white/5"
                    : "text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5"
                )}
              >
                Aprende
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", aprendeOpen && "rotate-180")} />
              </button>

              {aprendeOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0D1117]/95 backdrop-blur-xl shadow-xl shadow-black/30 py-2">
                  {aprendeItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setAprendeOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00FF88]/20 transition-colors">
                        <item.icon className="w-4 h-4 text-[#00FF88]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F0F1F5]">{item.label}</div>
                        <div className="text-xs text-[#9DA5B4]/60 mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Comunidad dropdown */}
            <div className="relative" ref={comunidadRef}>
              <button
                onClick={() => { setComunidadOpen(!comunidadOpen); setAprendeOpen(false); setUserOpen(false); }}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all",
                  comunidadOpen
                    ? "text-[#F0F1F5] bg-white/5"
                    : "text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5"
                )}
              >
                Comunidad
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", comunidadOpen && "rotate-180")} />
              </button>

              {comunidadOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-white/10 bg-[#0D1117]/95 backdrop-blur-xl shadow-xl shadow-black/30 py-2">
                  {comunidadItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setComunidadOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00FF88]/20 transition-colors">
                        <item.icon className="w-4 h-4 text-[#00FF88]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#F0F1F5]">{item.label}</div>
                        <div className="text-xs text-[#9DA5B4]/60 mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#9DA5B4] hover:text-[#F0F1F5] rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/newsletter">Newsletter</Link>
            </Button>

            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userRef}>
                    <button
                      onClick={() => { setUserOpen(!userOpen); setAprendeOpen(false); setComunidadOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                    >
                      {user.user_metadata?.avatar_url && (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Avatar"
                          className="w-6 h-6 rounded-full ring-1 ring-[#00FF88]"
                        />
                      )}
                      <span className="text-sm text-[#F0F1F5]">{user.user_metadata?.full_name || "Perfil"}</span>
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", userOpen && "rotate-180")} />
                    </button>

                    {userOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0D1117]/95 backdrop-blur-xl shadow-xl shadow-black/30 py-2">
                        <Link
                          href="/user"
                          onClick={() => setUserOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                        >
                          <User className="w-4 h-4 text-[#00FF88]" />
                          <span className="text-sm text-[#F0F1F5]">Mi perfil</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">Cerrar sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button size="sm" asChild>
                    <Link href="/unirse">Unirse</Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#9DA5B4] hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-white/5 bg-[#0D1117] transition-all duration-200",
          open ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
          <p className="px-3 py-1 text-xs font-semibold text-[#9DA5B4]/50 uppercase tracking-wider">Aprende</p>
          {aprendeItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-3 text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5 rounded-lg transition-all"
            >
              <item.icon className="w-4 h-4 text-[#00FF88]" />
              {item.label}
            </Link>
          ))}
          <div className="border-t border-white/5 my-2" />
          <p className="px-3 py-1 text-xs font-semibold text-[#9DA5B4]/50 uppercase tracking-wider">Comunidad</p>
          {comunidadItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="flex items-center gap-3 px-3 py-3 text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5 rounded-lg transition-all"
            >
              <item.icon className="w-4 h-4 text-[#00FF88]" />
              {item.label}
            </Link>
          ))}
          <div className="border-t border-white/5 my-2" />
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className="px-3 py-3 text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/newsletter" onClick={closeAll}>Newsletter</Link>
            </Button>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/user" onClick={closeAll}>Mi perfil</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Salir
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="flex-1" asChild>
                    <Link href="/unirse" onClick={closeAll}>Unirse</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
