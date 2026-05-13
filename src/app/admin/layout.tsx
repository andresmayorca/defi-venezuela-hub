export const dynamic = "force-dynamic";

import Link from "next/link";
import { Zap, LayoutDashboard, FileText, Wrench, Briefcase, Calendar, Bot, GraduationCap, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/herramientas", label: "Herramientas", icon: Wrench },
  { href: "/admin/empleos", label: "Empleos", icon: Briefcase },
  { href: "/admin/eventos", label: "Eventos", icon: Calendar },
  { href: "/admin/agentic-world", label: "Agentic World", icon: Bot },
  { href: "/admin/aprende", label: "Aprende", icon: GraduationCap },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/5 bg-[#0D1117] flex flex-col pt-6 px-3">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-6 h-6 rounded bg-[#00FF88] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#0D1117] fill-[#0D1117]" />
          </div>
          <span className="text-sm font-bold text-[#F0F1F5]">Admin Panel</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5 transition-all"
            >
              <item.icon className="w-4 h-4 text-[#00FF88]" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-4 pb-6 px-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#9DA5B4]/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-[#0D1117]">
        {children}
      </main>
    </div>
  );
}
