"use client";

import { useState } from "react";
import { LogOut, Loader } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-medium"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Saliendo...
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          Salir
        </>
      )}
    </button>
  );
}
