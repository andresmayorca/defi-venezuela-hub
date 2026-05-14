import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FileText, Wrench, Briefcase, Calendar, Bot, GraduationCap, Users, ArrowRight, Mail, Sparkles } from "lucide-react";

const sections = [
  { href: "/admin/ai-content", label: "IA Content", icon: Sparkles, desc: "Genera con inteligencia artificial", color: "text-purple-400 bg-purple-400/10" },
  { href: "/admin/newsletters", label: "Newsletters", icon: Mail, desc: "Gestionar y enviar", color: "text-red-400 bg-red-400/10" },
  { href: "/admin/blog", label: "Blog", icon: FileText, desc: "Artículos y posts", color: "text-blue-400 bg-blue-400/10" },
  { href: "/admin/herramientas", label: "Herramientas", icon: Wrench, desc: "Herramientas y servicios", color: "text-[#00FF88] bg-[#00FF88]/10" },
  { href: "/admin/empleos", label: "Empleos", icon: Briefcase, desc: "Ofertas Web3", color: "text-yellow-400 bg-yellow-400/10" },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar, desc: "Hackathons y meetups", color: "text-purple-400 bg-purple-400/10" },
  { href: "/admin/agentic-world", label: "Agentic World", icon: Bot, desc: "Casos de uso y proyectos", color: "text-cyan-400 bg-cyan-400/10" },
  { href: "/admin/aprende", label: "Aprende", icon: GraduationCap, desc: "Tracks y lecciones", color: "text-orange-400 bg-orange-400/10" },
];

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: subscriberCount } = await supabase
    .from("subscribers")
    .select("*", { count: "exact", head: true });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F0F1F5] mb-1">Dashboard</h1>
        <p className="text-[#9DA5B4]/60 text-sm">
          Bienvenido, <span className="text-[#00FF88]">Admin</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl border border-white/5 bg-[#161B24]">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-4 h-4 text-[#00FF88]" />
            <span className="text-xs text-[#9DA5B4]/60 uppercase tracking-wider font-semibold">Suscriptores</span>
          </div>
          <div className="text-3xl font-bold text-[#F0F1F5]">{subscriberCount ?? 0}</div>
          <p className="text-xs text-[#9DA5B4]/40 mt-1">Con notificaciones activas</p>
        </div>
        <div className="p-5 rounded-xl border border-white/5 bg-[#161B24]">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-4 h-4 text-[#00FF88]" />
            <span className="text-xs text-[#9DA5B4]/60 uppercase tracking-wider font-semibold">Secciones</span>
          </div>
          <div className="text-3xl font-bold text-[#F0F1F5]">6</div>
          <p className="text-xs text-[#9DA5B4]/40 mt-1">Áreas de contenido</p>
        </div>
        <div className="p-5 rounded-xl border border-white/5 bg-[#161B24]">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#00FF88] text-sm font-bold">📧</span>
            <span className="text-xs text-[#9DA5B4]/60 uppercase tracking-wider font-semibold">Notificaciones</span>
          </div>
          <div className="text-3xl font-bold text-[#F0F1F5]">Auto</div>
          <p className="text-xs text-[#9DA5B4]/40 mt-1">Al publicar contenido</p>
        </div>
      </div>

      {/* Sections grid */}
      <h2 className="text-sm font-semibold text-[#9DA5B4]/60 uppercase tracking-wider mb-4">Gestionar contenido</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-[#161B24] hover:border-[#00FF88]/20 transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#F0F1F5] text-sm">{s.label}</div>
              <div className="text-xs text-[#9DA5B4]/50 mt-0.5">{s.desc}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9DA5B4]/30 group-hover:text-[#00FF88] group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
