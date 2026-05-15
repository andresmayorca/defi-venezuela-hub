"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronDown, Newspaper, GraduationCap, Users, Calendar,
  Briefcase, Globe, User, LogOut, Zap, Search, Plus,
  Rocket, BarChart3, Trophy, BookOpen, Gamepad2, Bot,
  MessageSquare, ScanSearch,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

/* ── Nav items ──────────────────────────────────────────────────────── */
const ecosistemaItems = [
  { href: "/startups", icon: Rocket, label: "Startups", desc: "Proyectos del ecosistema" },
  { href: "/hackathon", icon: Trophy, label: "MVPs Hackathon", desc: "Proyectos de competencias" },
  { href: "/comunidades", icon: Users, label: "Comunidades", desc: "Discord, Telegram y más" },
  { href: "/empleos", icon: Briefcase, label: "Trabajos Web3", desc: "Cobra en USDC" },
  { href: "/protocolos", icon: BarChart3, label: "Protocolos DeFi", desc: "Los mejores para venezolanos" },
];

const aprendeItems = [
  { href: "/blog", icon: BookOpen, label: "Blog", desc: "Web3, DeFi, Tecnología y más" },
  { href: "/aprende", icon: GraduationCap, label: "Todos los tracks", desc: "Blockchain, DeFi, Web3 e IA" },
  { href: "/protocolos", icon: Globe, label: "Protocolos DeFi", desc: "Guías y comparativas" },
  { href: "/academia", icon: Gamepad2, label: "Academia", desc: "Aprende jugando" },
];

const agenticItems = [
  { href: "/agentic-world", icon: Zap, label: "Deploy tu AI Room", desc: "Crea tu agente de trading" },
  { href: "/agentic-world/bots", icon: Bot, label: "Bobby Agent", desc: "Agente trader inteligente" },
  { href: "/agentic-world/forum", icon: MessageSquare, label: "Agent Debates", desc: "IA vs IA en el mercado" },
  { href: "/agentic-world/intelligence", icon: ScanSearch, label: "Intelligence Protocol", desc: "Datos en tiempo real" },
];

const mainLinks = [
  { href: "/eventos", label: "Eventos" },
  { href: "/herramientas", label: "Herramientas" },
];

/* ── Animations ─────────────────────────────────────────────────────── */
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

/* ── Dropdown component ─────────────────────────────────────────────── */
interface DropItem { href: string; icon: React.ComponentType<{ className?: string }>; label: string; desc: string; }

function NavDropdown({
  label, items, isOpen, onToggle, isActive,
}: { label: string; items: DropItem[]; isOpen: boolean; onToggle: () => void; isActive: boolean }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "relative flex items-center gap-1 text-sm font-medium transition-colors group",
          isActive ? "text-[#00FF88]" : "text-white/60 hover:text-white"
        )}
      >
        {label}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
        <span className={cn(
          "absolute -bottom-1 left-0 h-0.5 bg-[#00FF88] transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-3 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40 py-2 overflow-hidden"
            style={{ width: "17rem", background: "hsl(201,80%,5%,0.95)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />
            {items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.15 }}
              >
                <Link
                  href={item.href}
                  onClick={onToggle}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#00FF88]/20 transition-colors">
                    <item.icon className="w-4 h-4 text-[#00FF88]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Navbar ─────────────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [ecosistemaOpen, setEcosistemaOpen] = useState(false);
  const [aprendeOpen, setAprendeOpen] = useState(false);
  const [agenticOpen, setAgenticOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ user_metadata?: { avatar_url?: string; full_name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkAuth();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    function handleClickOutside() {
      setEcosistemaOpen(false);
      setAprendeOpen(false);
      setAgenticOpen(false);
      setUserOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [supabase]);

  /* close mobile when route changes */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* lock body scroll when mobile open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function closeAll() {
    setOpen(false); setEcosistemaOpen(false); setAprendeOpen(false);
    setAgenticOpen(false); setUserOpen(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeAll();
  };

  /* breadcrumbs */
  const pathSegments = pathname.split("/").filter(Boolean);
  const showBreadcrumbs = pathSegments.length > 0;

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggle = (which: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEcosistemaOpen(which === "eco" ? !ecosistemaOpen : false);
    setAprendeOpen(which === "apr" ? !aprendeOpen : false);
    setAgenticOpen(which === "age" ? !agenticOpen : false);
    setUserOpen(which === "usr" ? !userOpen : false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md border-b border-white/[0.06] shadow-sm"
            : ""
        )}
        style={{ background: scrolled ? "hsl(201,100%,6%,0.85)" : "hsl(201,100%,6%,0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-14" : "h-20")}>
            {/* Logo */}
            <Link href="/" onClick={closeAll} className="flex items-center gap-3 group">
              <motion.div
                className="w-8 h-8 rounded-lg bg-[#00FF88] flex items-center justify-center"
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="w-4 h-4 text-black fill-black" />
              </motion.div>
              <motion.span
                className={cn("font-bold text-white transition-all duration-300", scrolled ? "text-lg" : "text-xl")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                DeFi<span className="text-[#00FF88]">Venezuela</span>
              </motion.span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7" onClick={(e) => e.stopPropagation()}>
              <Link
                href="/"
                className={cn(
                  "relative text-sm font-medium transition-colors group",
                  isActive("/") ? "text-[#00FF88]" : "text-white/60 hover:text-white"
                )}
              >
                Inicio
                <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-[#00FF88] transition-all duration-300", isActive("/") ? "w-full" : "w-0 group-hover:w-full")} />
              </Link>

              <NavDropdown label="Ecosistema" items={ecosistemaItems} isOpen={ecosistemaOpen}
                onToggle={() => toggle("eco", { stopPropagation: () => {} } as React.MouseEvent)}
                isActive={ecosistemaItems.some(i => isActive(i.href))} />

              <NavDropdown label="Aprende" items={aprendeItems} isOpen={aprendeOpen}
                onToggle={() => toggle("apr", { stopPropagation: () => {} } as React.MouseEvent)}
                isActive={aprendeItems.some(i => isActive(i.href))} />

              <NavDropdown label="Agentic World" items={agenticItems} isOpen={agenticOpen}
                onToggle={() => toggle("age", { stopPropagation: () => {} } as React.MouseEvent)}
                isActive={pathname.startsWith("/agentic-world")} />

              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors group",
                    isActive(link.href) ? "text-[#00FF88]" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-[#00FF88] transition-all duration-300", isActive(link.href) ? "w-full" : "w-0 group-hover:w-full")} />
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <Search className="w-4 h-4" />
              </button>

              {!loading && (
                user ? (
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggle("usr", { stopPropagation: () => {} } as React.MouseEvent)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/8"
                    >
                      {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-7 h-7 rounded-full ring-2 ring-[#00FF88]/30" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-[#00FF88]" />
                        </div>
                      )}
                      <span className="text-sm text-white font-medium">
                        {user.user_metadata?.full_name?.split(" ")[0] || "Perfil"}
                      </span>
                      <motion.div animate={{ rotate: userOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {userOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden" animate="visible" exit="exit"
                          className="absolute top-full right-0 mt-2 w-48 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl py-2"
                          style={{ background: "hsl(201,80%,5%,0.95)" }}
                        >
                          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />
                          <Link href="/user" onClick={closeAll} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                            <User className="w-4 h-4 text-[#00FF88]" />
                            <span className="text-sm text-white">Mi perfil</span>
                          </Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left">
                            <LogOut className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400">Cerrar sesión</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/unirse"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-black text-sm font-bold bg-[#00FF88] hover:bg-[#00e67a] transition-all hover:scale-[1.03]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Únete
                  </Link>
                )
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div animate={open ? "open" : "closed"} className="w-6 h-6 relative">
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
                  className="absolute w-6 h-0.5 bg-current top-1.5 left-0 origin-center"
                />
                <motion.span
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  className="absolute w-6 h-0.5 bg-current top-3 left-0"
                />
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
                  className="absolute w-6 h-0.5 bg-current top-[18px] left-0 origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t border-white/[0.04] backdrop-blur-sm"
            style={{ background: "hsl(201,100%,6%,0.5)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <nav className="flex items-center gap-2 text-xs text-white/40">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                {pathSegments.map((seg, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                    <Link
                      href={"/" + pathSegments.slice(0, i + 1).join("/")}
                      className={cn("hover:text-white transition-colors capitalize", i === pathSegments.length - 1 && "text-white font-medium")}
                    >
                      {seg.replace(/-/g, " ")}
                    </Link>
                  </span>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* ── Mobile overlay + slide-from-right drawer ─────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "hsl(201,100%,6%,0.8)", backdropFilter: "blur(4px)" }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 z-50 md:hidden border-l border-white/[0.06]"
              style={{ background: "hsl(201,100%,4%)" }}
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <span className="text-lg font-semibold text-white">Menú</span>
                  <button onClick={() => setOpen(false)} className="p-2 text-white/40 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer nav */}
                <nav className="flex-1 px-6 py-4 overflow-y-auto space-y-2">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
                    <Link href="/" onClick={closeAll}
                      className={cn("block px-4 py-3 rounded-xl text-sm font-medium transition-colors", isActive("/") ? "bg-[#00FF88] text-black" : "text-white/60 hover:text-white hover:bg-white/5")}>
                      Inicio
                    </Link>
                  </motion.div>

                  {[
                    { label: "Ecosistema", items: ecosistemaItems, delay: 0.1 },
                    { label: "Aprende", items: aprendeItems, delay: 0.17 },
                    { label: "Agentic World", items: agenticItems, delay: 0.22 },
                  ].map(({ label, items, delay }) => (
                    <motion.div key={label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }} className="pt-2">
                      <p className="px-4 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">{label}</p>
                      <div className="space-y-0.5">
                        {items.map((item) => (
                          <Link key={item.href} href={item.href} onClick={closeAll}
                            className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                              isActive(item.href) ? "bg-[#00FF88] text-black" : "text-white/60 hover:text-white hover:bg-white/5")}>
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 }} className="pt-2">
                    <p className="px-4 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Más</p>
                    {mainLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={closeAll}
                        className={cn("block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                          isActive(link.href) ? "bg-[#00FF88] text-black" : "text-white/60 hover:text-white hover:bg-white/5")}>
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                </nav>

                {/* Drawer actions */}
                <div className="p-6 border-t border-white/[0.06] space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" /> Buscar
                  </Button>
                  {!loading && (
                    user ? (
                      <Button size="sm" className="w-full" asChild>
                        <Link href="/user" onClick={closeAll}>Mi perfil</Link>
                      </Button>
                    ) : (
                      <Link
                        href="/unirse"
                        onClick={closeAll}
                        className="flex items-center justify-center gap-1.5 w-full px-5 py-2.5 rounded-full text-black text-sm font-bold bg-[#00FF88] hover:bg-[#00e67a] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Únete a la comunidad
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className={scrolled ? "h-14" : "h-20"} />
    </>
  );
}
