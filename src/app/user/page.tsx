"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Bell, LogOut } from "lucide-react";
import ProfileForm from "./ProfileForm";
import NotificationsForm from "./NotificationsForm";

type Tab = "perfil" | "notificaciones";

export default function UserPage() {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("perfil");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/unirse");
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-[#9DA5B4]">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#161B24] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full ring-2 ring-[#00FF88]"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-[#F0F1F5]">
                  {user.user_metadata?.full_name || "Usuario"}
                </h1>
                <p className="text-sm text-[#9DA5B4]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#9DA5B4]/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-[#0D1117]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setTab("perfil")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                tab === "perfil"
                  ? "border-[#00FF88] text-[#00FF88]"
                  : "border-transparent text-[#9DA5B4] hover:text-[#F0F1F5]"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Perfil
              </div>
            </button>
            <button
              onClick={() => setTab("notificaciones")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                tab === "notificaciones"
                  ? "border-[#00FF88] text-[#00FF88]"
                  : "border-transparent text-[#9DA5B4] hover:text-[#F0F1F5]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificaciones
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tab === "perfil" && <ProfileForm user={user} />}
        {tab === "notificaciones" && <NotificationsForm userId={user.id} />}
      </div>
    </div>
  );
}
