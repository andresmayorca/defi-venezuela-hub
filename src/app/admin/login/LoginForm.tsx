"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Error al conectar con el servidor");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Username */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Usuario
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9DA5B4]/50 pointer-events-none" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            placeholder="admin"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 transition-colors"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9DA5B4]/50 pointer-events-none" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full pl-10 pr-11 py-2.5 rounded-lg bg-[#0D1117] border border-[#00FF88]/20 text-[#F0F1F5] placeholder-[#9DA5B4]/40 focus:outline-none focus:border-[#00FF88]/50 disabled:opacity-50 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9DA5B4]/50 hover:text-[#9DA5B4] disabled:opacity-50 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !username || !password}
        className="w-full px-4 py-2.5 rounded-lg bg-[#00FF88] text-[#0D1117] font-semibold hover:bg-[#00FF88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </button>

      <p className="text-xs text-[#9DA5B4]/50 text-center mt-4">
        La sesión expira en 8 horas o cuando cierres sesión
      </p>
    </form>
  );
}
