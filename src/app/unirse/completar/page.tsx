"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";

const interests = [
  "Trading",
  "Desarrollo Web3",
  "Comunidad",
  "DeFi",
  "NFTs",
  "Staking",
  "DAOs",
];

export default function CompletarPerfilPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [ethereumWallet, setEthereumWallet] = useState("");
  const [solanaWallet, setSolanaWallet] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [newsletter, setNewsletter] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Por favor inicia sesión primero");
        router.push("/unirse");
        return;
      }

      const { error: err } = await supabase
        .from("user_profiles")
        .upsert({
          user_id: user.id,
          email: user.email,
          full_name: fullName,
          wallets: {
            ethereum: ethereumWallet || null,
            solana: solanaWallet || null,
          },
          interests: selectedInterests,
          newsletter_subscribed: newsletter,
        })
        .eq("user_id", user.id);

      if (err) {
        setError(err.message);
        return;
      }

      router.push("/user");
    } catch (err) {
      setError("Error al guardar perfil");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#161B24] p-8">
        <h1 className="text-3xl font-bold text-[#F0F1F5] mb-2">Completa tu perfil</h1>
        <p className="text-[#9DA5B4] mb-8">
          Cuéntanos más sobre ti para personalizar tu experiencia en DeFi Venezuela.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/40 transition-colors"
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Wallets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
                Wallet Ethereum
              </label>
              <input
                type="text"
                value={ethereumWallet}
                onChange={(e) => setEthereumWallet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/40 transition-colors text-xs"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
                Wallet Solana
              </label>
              <input
                type="text"
                value={solanaWallet}
                onChange={(e) => setSolanaWallet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/40 transition-colors text-xs"
                placeholder="Dirección Solana"
              />
            </div>
          </div>

          {/* Intereses */}
          <div>
            <label className="block text-sm font-semibold text-[#F0F1F5] mb-3">
              ¿Cuáles son tus intereses?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    selectedInterests.includes(interest)
                      ? "bg-[#00FF88]/10 border-[#00FF88]/40 text-[#00FF88]"
                      : "bg-transparent border-white/10 text-[#9DA5B4] hover:border-white/20"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                newsletter
                  ? "bg-[#00FF88]/20 border-[#00FF88]"
                  : "border-white/10"
              }`}
              onClick={() => setNewsletter(!newsletter)}
            >
              {newsletter && <span className="text-[#00FF88] font-bold">✓</span>}
            </div>
            <span className="text-sm text-[#9DA5B4]">
              Deseo recibir notificaciones sobre nuevos contenidos
            </span>
          </label>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loading || !fullName}
            className="w-full px-6 py-3 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#00e67a] transition-colors flex items-center justify-center gap-2"
          >
            {loading ? "Guardando..." : "Completar perfil"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
